use serde::Deserialize;

pub mod todo {
    use super::*;

    #[derive(Deserialize)]
    pub struct AddRequest {
        pub title: String,
        pub thumnail: Option<String>,
        pub delivery: String,
        pub description: String,
    }
}
