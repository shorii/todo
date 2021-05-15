use crate::schema::todos;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

pub mod todo {
    use super::*;

    #[derive(Debug, Clone, Serialize, Deserialize, Queryable, Insertable)]
    pub struct Todo {
        pub id: String,
        pub title: String,
        pub delivery: String,
        pub detail: String,
    }

    impl Todo {
        pub fn new(
            title: String,
            delivery: String,
            detail: String,
        ) -> Self {
            let id = Uuid::new_v4().to_hyphenated().to_string();
            Self {
                id: id,
                title: title,
                delivery: delivery,
                detail: detail,
            }
        }
    }
}
