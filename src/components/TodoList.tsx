import React from "react";
import "./styles.css";
import { Todo } from "../model";
import SingleTodo from "./SingleTodo";

interface Props {
  todos: Todo[];
  set_todos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({ todos, set_todos }) => {
  return (
    <div className="todos">
      {todos.map((todo) => (
        <SingleTodo
          todo={todo}
          key={todo.id}
          todos={todos}
          set_todos={set_todos}
        />
      ))}
    </div>
  );
};

export default TodoList;
