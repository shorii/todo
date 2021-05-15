use serde::Deserialize;

pub mod todo {
    use super::*;

    #[derive(Deserialize)]
    pub struct AddRequest {
        pub title: String,
        pub delivery: String,
        pub detail: String,
    }
}
