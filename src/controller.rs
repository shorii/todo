use actix_web::{delete, get, post, web, HttpResponse};

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

    #[get("todo")]
    pub async fn get() -> Result<HttpResponse, actix_web::Error> {
        let response_body = "get todo list";
        Ok(HttpResponse::Ok().body(response_body))
    }

    #[post("todo")]
    pub async fn add() -> Result<HttpResponse, actix_web::Error> {
        let response_body = "add todo";
        Ok(HttpResponse::Ok().body(response_body))
    }

    #[delete("todo/{id}")]
    pub async fn delete(web::Path(id): web::Path<u32>) -> Result<HttpResponse, actix_web::Error> {
        let response_body = format!("delete todo {}", id);
        Ok(HttpResponse::Ok().body(response_body))
    }
}
