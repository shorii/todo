use crate::schema::todos;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

pub mod todo {
    use super::*;

    #[derive(Debug, Clone, Serialize, Deserialize, Queryable, Insertable)]
    pub struct Todo {
        pub id: String,
        pub title: String,
        pub thumnail: Option<String>,
        pub delivery: String,
        pub detail: String,
    }

    impl Todo {
        pub fn new(
            title: String,
            thumnail: Option<String>,
            delivery: String,
            description: String,
        ) -> Self {
            let id = Uuid::new_v4().to_hyphenated().to_string();
            Self {
                id: id,
                title: title,
                thumnail: thumnail,
                delivery: delivery,
                detail: description,
            }
        }
    }
}
