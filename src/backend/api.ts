import { invoke } from "@tauri-apps/api/tauri";
import { Todo } from "./models/Todo.ts";

export function get_todos() {
  return invoke("get_todos").then((res: unknown) => {
    return res as Array<Todo>;
  });
}

export function add_todo(todo_text: string) {
  invoke("add_todo", { todoText: todo_text });
}

export function update_todo_state(todo_id: number, todo_state: boolean) {
  invoke("update_todo_state", { id: todo_id, newState: todo_state });
}

export function delete_todo(todo_id: number) {
  invoke("delete_todo", { id: todo_id });
}

export function update_todo_text(todo_id: number, todo_text: string) {
  invoke("update_todo_text", { id: todo_id, todoText: todo_text });
}
