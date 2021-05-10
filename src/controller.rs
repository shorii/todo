use crate::domain;
use crate::model;
use crate::repository;
use actix_web::{delete, error, get, post, web, HttpRequest, HttpResponse};
use anyhow::bail;
use asset::dir::AssetDir;
use html5ever::driver::ParseOpts;
use html5ever::parse_document;
use html5ever::serialize;
use html5ever::serialize::SerializeOpts;
use html5ever::tendril::{StrTendril, TendrilSink};
use html5ever::{namespace_url, ns};
use html5ever::{Attribute, LocalName, QualName};
use markup5ever_rcdom::{Node, NodeData, RcDom, SerializableHandle};
use std::cell::RefCell;
use std::path::PathBuf;

pub mod ui {
    use super::*;
    const PATH_PREFIX: &'static str = "build";

    fn inject_script(value: &str) -> String {
        let parser = parse_document(RcDom::default(), ParseOpts::default());
        let dom = parser.one(value);
        {
            let html_node = &dom.document.children.borrow()[1];
            let script_node = Node::new(NodeData::Element {
                name: QualName::new(None, ns!(html), LocalName::from("script")),
                attrs: RefCell::new(vec![Attribute {
                    name: QualName::new(None, ns!(), LocalName::from("type")),
                    value: StrTendril::from("text/javascript"),
                }]),
                template_contents: None,
                mathml_annotation_xml_integration_point: false,
            });
            script_node
                .children
                .borrow_mut()
                .push(Node::new(NodeData::Text {
                    contents: RefCell::new(format!("window.API_URL='{}';", "0.0.0.0:8080").into()),
                }));
            &html_node.children.borrow_mut().push(script_node);
        }
        let doc: SerializableHandle = dom.document.into();
        let mut bytes = vec![];
        serialize(&mut bytes, &doc, SerializeOpts::default()).unwrap();
        String::from_utf8(bytes).unwrap()
    }

    #[get("{filepath:.*}")]
    pub async fn get(
        directory: web::Data<AssetDir<'static>>,
        request: HttpRequest,
    ) -> Result<HttpResponse, actix_web::Error> {
        let mut path = PathBuf::new();
        path.push(PATH_PREFIX);
        let subpath: PathBuf = request
            .match_info()
            .query("filepath")
            .parse()
            .unwrap_or(PathBuf::from("index.html"));
        path.push(subpath);
        let file_ = directory
            .find(&path)
            .map_err(|e| error::ErrorBadRequest(e))?;
        let value = String::from_utf8(file_.content())
            .map_err(|_e| error::ErrorBadRequest(file_.name()))?;
        if path.ends_with(PathBuf::from("index.html")) {
            let index = inject_script(&value.clone());
            Ok(HttpResponse::Ok().body(index))
        } else {
            Ok(HttpResponse::Ok().body(value))
        }
    }
}

pub mod todo {
    use super::*;
    use domain::todo::*;
    use model::todo::*;
    use repository::todo::*;

    #[get("todo")]
    pub async fn get(
        repository: web::Data<TodoRepository>,
    ) -> Result<HttpResponse, actix_web::Error> {
        let todos = web::block(move || repository.find_all()).await?;
        Ok(HttpResponse::Ok().json(todos))
    }

    #[post("todo")]
    pub async fn add(
        repository: web::Data<TodoRepository>,
        request: web::Json<AddRequest>,
    ) -> Result<HttpResponse, actix_web::Error> {
        let todo = Todo::new(
            request.title.clone(),
            request.thumnail.clone(),
            request.delivery.clone(),
            request.description.clone(),
        );
        let todo_entity = todo.clone();
        web::block(move || repository.add(todo_entity)).await?;
        Ok(HttpResponse::Ok().json(todo))
    }

    #[delete("todo/{id}")]
    pub async fn delete(
        repository: web::Data<TodoRepository>,
        web::Path(id): web::Path<String>,
    ) -> Result<HttpResponse, actix_web::Error> {
        let id_ = id.clone();
        web::block(move || {
            let target = repository.get(id_.clone());
            if let Ok(todo) = target {
                repository.delete(todo)
            } else {
                bail!("Unable to find todo {}", id_.clone());
            }
        })
        .await?;
        let response_body = format!("delete todo {}", id);
        Ok(HttpResponse::Ok().body(response_body))
    }
}
