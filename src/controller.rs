use crate::domain;
use crate::model;
use crate::repository;
use actix_web::{delete, get, post, web, HttpResponse};
use anyhow::bail;

pub mod ui {
    use super::*;

    #[get("/index.html")]
    pub async fn index() -> Result<HttpResponse, actix_web::Error> {
        let response_body = "Hello world!";
        Ok(HttpResponse::Ok().body(response_body))
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
