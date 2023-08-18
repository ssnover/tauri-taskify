// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::sync::{Arc, Mutex};

mod commands;
mod database;
mod models;

pub struct AppState {
    db_conn: Arc<Mutex<database::DbConn>>,
    todos: Mutex<Vec<models::Todo>>,
}

fn main() {
    let mut db_path = std::env::temp_dir();
    db_path.push("taskify.sqlite");
    let db_conn = database::DbConn::new(&db_path).unwrap();
    let db_conn = Arc::new(Mutex::new(db_conn));

    let app_state = AppState {
        db_conn: db_conn.clone(),
        todos: Mutex::new(db_conn.lock().unwrap().get_todos().unwrap()),
    };

    tauri::Builder::default()
        .manage(app_state)
        .invoke_handler(tauri::generate_handler![
            commands::add_todo,
            commands::get_todos,
            commands::update_todo_state,
            commands::delete_todo,
            commands::update_todo_text,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
