use serde::{Deserialize, Serialize};
use ts_rs::TS;

#[derive(Clone, Debug, Deserialize, Serialize, TS)]
#[ts(export, export_to = "../src/backend/models/")]
pub struct Todo {
    pub id: i32,
    pub todo: String,
    pub is_done: bool,
}
