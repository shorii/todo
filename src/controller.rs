use crate::domain;
use crate::model;
use crate::repository;
use actix_web::{delete, error, get, post, web, HttpRequest, HttpResponse};
use anyhow::bail;
use asset::dir::AssetDir;
use std::path::PathBuf;

pub mod ui {
    use super::*;
    const PATH_PREFIX: &'static str = "build";

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
        Ok(HttpResponse::Ok().body(value))
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
            request.delivery.clone(),
            request.detail.clone(),
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
        let response_body = "{\"message\": \"ok\"}";
        Ok(HttpResponse::Ok().body(response_body))
    }
}
