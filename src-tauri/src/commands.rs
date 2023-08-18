use crate::models::Todo;

#[tauri::command]
pub fn add_todo(todo_text: String, state: tauri::State<super::AppState>) {
    let todo = state.db_conn.lock().unwrap().add_todo(&todo_text).unwrap();
    state.todos.lock().unwrap().push(todo);
}

#[tauri::command]
pub fn get_todos(state: tauri::State<super::AppState>) -> Vec<Todo> {
    let todos = state.db_conn.lock().unwrap().get_todos().unwrap();
    todos
}

#[tauri::command]
pub fn update_todo_state(id: i32, new_state: bool, state: tauri::State<super::AppState>) {
    state
        .db_conn
        .lock()
        .unwrap()
        .update_todo_state(id, new_state)
        .unwrap();
}

#[tauri::command]
pub fn delete_todo(id: i32, state: tauri::State<super::AppState>) {
    state.db_conn.lock().unwrap().delete_todo(id).unwrap();
}

#[tauri::command]
pub fn update_todo_text(id: i32, todo_text: String, state: tauri::State<super::AppState>) {
    state
        .db_conn
        .lock()
        .unwrap()
        .update_todo_text(id, todo_text)
        .unwrap();
}
