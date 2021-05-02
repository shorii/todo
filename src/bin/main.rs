use actix_web::{web, App, HttpServer};
use diesel::prelude::*;
use diesel::r2d2::{self, ConnectionManager};
use todo::controller;
use todo::repository;

#[actix_rt::main]
async fn main() -> Result<(), actix_web::Error> {
    let connspec = std::env::var("DATABASE_URL").expect("DATABASE_URL is not set");
    let manager = ConnectionManager::<SqliteConnection>::new(connspec);
    let pool = r2d2::Pool::builder()
        .build(manager)
        .expect("Failed to create pool.");
    let rep = repository::todo::TodoRepository { pool: pool.clone() };

    // TODO set default service
    HttpServer::new(move || {
        App::new()
            .service(web::scope("/ui").service(controller::ui::index))
            .service(
                web::scope("/api")
                    .data(rep.clone())
                    .service(controller::todo::get)
                    .service(controller::todo::add)
                    .service(controller::todo::delete),
            )
    })
    .bind("0.0.0.0:8080")?
    .run()
    .await?;
    Ok(())
}
