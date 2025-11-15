import React from "react";
import { TodoForm } from "./TodoForm";
import { TodoList } from "./TodoList";
import { useTodo } from "../context/TodoContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TodoApp = () => {
  // 状態管理 - State management
  const { incompleteTodoCount } = useTodo();

  // // 未完了のタスク数をカウントする - Count Incomplete task
  // const incompleteTodos: number = todos.filter((todo) => !todo.completed).length;

  return (
    <>
      <main className="container mx-auto flex flex-col items-center p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold tracking-tight">TodoList</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <TodoForm />
            <div className="space-y-3">
              <h2 className="text-lg font-semibold">未完了のタスク： {incompleteTodoCount} 件</h2>
            </div>
            <TodoList />
          </CardContent>
        </Card>
      </main>
    </>
  );
};

export default TodoApp;
