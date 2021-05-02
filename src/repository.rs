use crate::domain;
use anyhow::Result;
use diesel::prelude::*;
use diesel::r2d2::{self, ConnectionManager};

type DbPool = r2d2::Pool<ConnectionManager<SqliteConnection>>;

pub mod todo {
    use super::*;
    use domain::todo::*;
    use crate::schema::todos;
    use crate::schema::todos::dsl::*;
    #[derive(Clone)]
    pub struct TodoRepository {
        pub pool: DbPool,
    }

    impl TodoRepository {
        pub fn get(&self, id_: String) -> Result<Todo> {
            let conn = self.pool.get()?;
            let result = todos.find(id_).first(&conn)?;
            Ok(result)
        }

        pub fn find_all(&self) -> Result<Vec<Todo>> {
            let conn = self.pool.get()?;
            let result = todos.load::<Todo>(&conn)?;
            Ok(result)
        }

        pub fn add(&self, todo: Todo) -> Result<()> {
            let conn = self.pool.get()?;
            diesel::insert_into(todos::table)
                .values(&todo)
                .execute(&conn)?;
            Ok(())
        }

        pub fn delete(&self, todo: Todo) -> Result<()> {
            let conn = self.pool.get()?;
            diesel::delete(todos.filter(id.eq(todo.id))).execute(&conn)?;
            Ok(())
        }
    }
}
