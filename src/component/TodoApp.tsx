import React from "react";
import { TodoForm } from "./TodoForm";
import { TodoList } from "./TodoList";
import { useTodo } from "../context/TodoContext";

const TodoApp = () => {
  // 状態管理 - State management
  const { incompleteTodoCount } = useTodo();

  // // 未完了のタスク数をカウントする - Count Incomplete task
  // const incompleteTodos: number = todos.filter((todo) => !todo.completed).length;

  return (
    <div>
      <h1>TodoList</h1>
      <TodoForm />
      <p>未完了のタスク： {incompleteTodoCount} 件</p>
      <TodoList />
    </div>
  );
};

export default TodoApp;
