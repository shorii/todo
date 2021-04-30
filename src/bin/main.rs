use actix_web::{web, App, HttpServer};
use todo::controller;

#[actix_rt::main]
async fn main() -> Result<(), actix_web::Error> {
    // TODO set default service
    HttpServer::new(move || {
        App::new()
            .service(web::scope("/ui").service(controller::ui::index))
            .service(
                web::scope("/api")
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
