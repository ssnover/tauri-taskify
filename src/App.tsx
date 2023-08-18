import React, { useState, useEffect } from "react";
import "./App.css";
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";
import { Todo } from "./model";
import { Todo as TodoData } from "./backend/models/Todo";
import { add_todo, get_todos } from "./backend/api";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todo_list, set_todo_list] = useState<Todo[]>([]);

  useEffect(() => {
    get_todos().then((todos: TodoData[]) => set_todo_list(todos));
  }, []);

  const handle_add = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      add_todo(todo);
      get_todos().then((todos: TodoData[]) => set_todo_list(todos));
      setTodo("");
    }
  };

  return (
    <div className="App">
      <span className="heading">Taskify</span>
      <InputField todo={todo} setTodo={setTodo} handle_add={handle_add} />
      <TodoList todos={todo_list} set_todos={set_todo_list} />
    </div>
  );
};

export default App;
