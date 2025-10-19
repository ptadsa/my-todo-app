import React from "react";
import { TodoItem } from "./TodoItem";
import { useTodo } from "../context/TodoContext";

export const TodoList: React.FC = () => {
  const { todos } = useTodo();
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};
