import React, { useState } from "react";
import { useTodo } from "../context/TodoContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const TodoForm: React.FC = () => {
  //   新しいTodoを追加する関数 - Add new todo Function
  const [newTodo, setNewTodo] = useState<string>("");
  console.log(newTodo);
  const { addTodo } = useTodo(); //custom hook usage

  //   新しいTodoを追加する関数 - Add new todo Function
  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    // prevent insert empty item on input
    if (newTodo.trim() === "") return;

    //   新しいTodoを作成 - Create new todo
    addTodo(newTodo); //custom hook usage

    //   入力フィールドをクリア - Clear input field
    setNewTodo("");
  };
  return (
    <>
      <form onSubmit={handleAddTodo} className="flex w-full items-center space-x-2">
        <Input type="text" value={newTodo} name="" id="newTodo" onChange={(e) => setNewTodo(e.target.value)} />
        <Button type="submit">
          <Plus className="mr-2 h-2 w-2"></Plus>追加
        </Button>
      </form>
    </>
  );
};
