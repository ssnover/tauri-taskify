import React, { useRef } from "react";
import "./styles.css";

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handle_add: (e: React.FormEvent) => void;
}

const InputField: React.FC<Props> = ({ todo, setTodo, handle_add }) => {
  const input_ref = useRef<HTMLInputElement>(null);

  return (
    <form
      className="input"
      onSubmit={(e) => {
        handle_add(e);
        input_ref.current?.blur();
      }}
    >
      <input
        ref={input_ref}
        type="input"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        placeholder="Enter a task"
        className="input__box"
      />
      <button className="input__submit" type="submit">
        Go
      </button>
    </form>
  );
};

export default InputField;
