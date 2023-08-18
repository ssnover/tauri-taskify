import React, { useState, useRef, useEffect } from "react";
import { Todo } from "../model";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import "./styles.css";
import { delete_todo, update_todo_state, update_todo_text } from "../backend/api";

interface Props {
  todo: Todo;
  todos: Todo[];
  set_todos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo: React.FC<Props> = ({ todo, todos, set_todos }) => {
  const [edit, set_edit] = useState<boolean>(false);
  const [edit_todo, set_edit_todo] = useState<string>(todo.todo);

  const handle_done = (id: number) => {
    set_todos(
      todos.map((todo) => {
        if (todo.id === id) {
          update_todo_state(id, !todo.is_done);
          return { ...todo, is_done: !todo.is_done };
        }
        return todo;
      })
    );
  };

  const handle_delete = (id: number) => {
    set_todos(todos.filter((todo) => todo.id !== id));
    delete_todo(id);
  };

  const handle_edit = (e: React.FormEvent, id: number) => {
    e.preventDefault();

    set_todos(
      todos.map((todo) => {
        if (todo.id === id) {
          update_todo_text(id, edit_todo);
          return { ...todo, todo: edit_todo };
        }
        return todo;
      })
    );
    set_edit(false);
  };

  const input_ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    input_ref.current?.focus();
  }, [edit]);

  return (
    <form className="todos__single" onSubmit={(e) => handle_edit(e, todo.id)}>
      {edit ? (
        <input
          ref={input_ref}
          value={edit_todo}
          onChange={(e) => set_edit_todo(e.target.value)}
          className="todos__single--text"
        />
      ) : todo.is_done ? (
        <s className="todos__single--text">{todo.todo}</s>
      ) : (
        <span className="todos__single--text">{todo.todo}</span>
      )}

      <div>
        <span
          className="icon"
          onClick={() => {
            if (!edit && !todo.is_done) {
              set_edit(!edit);
            }
          }}
        >
          <AiFillEdit />
        </span>
        <span className="icon" onClick={() => handle_delete(todo.id)}>
          <AiFillDelete />
        </span>
        <span className="icon" onClick={() => handle_done(todo.id)}>
          <MdDone />
        </span>
      </div>
    </form>
  );
};

export default SingleTodo;
