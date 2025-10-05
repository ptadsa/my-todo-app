import React, { useState } from "react";
import { useTodo } from "../context/todoContext";

export const TodoForm: React.FC = () => {
  //   新しいTodoを追加する関数 - Add new todo Function
  const [newTodo, setNewTodo] = useState<string>("");
  console.log(newTodo);
  const { dispatch } = useTodo();

  //   新しいTodoを追加する関数 - Add new todo Function
  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    // prevent insert empty item on input
    if (newTodo.trim() === "") return;

    //   新しいTodoを作成 - Create new todo
    dispatch({ type: "ADD_TODO", text: newTodo });

    //   入力フィールドをクリア - Clear input field
    setNewTodo("");
  };
  return (
    <div>
      <form onSubmit={handleAddTodo} action="">
        <input type="text" value={newTodo} name="" id="newTodo" onChange={(e) => setNewTodo(e.target.value)} />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};
