use crate::schema::todos;
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize, Queryable, Insertable)]
pub struct Todo {
    pub id: String,
    pub title: String,
    pub thumnail: Option<String>,
    pub delivery: String,
    pub detail: String,
}
