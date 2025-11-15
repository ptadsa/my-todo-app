import React, { useState } from "react";
import type { Todo } from "../reducers/TodoReducer";
import { useTodo } from "../context/TodoContext";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Pencil, Trash2, Check, X } from "lucide-react";

type TodoItemProps = {
  todo: Todo;
};

export const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingText, setEditingText] = useState<string>(todo.text);

  const { toggleTodo, deleteTodo, editTodo } = useTodo(); //custom hook usage

  const handleSave = () => {
    if (editingText.trim() === "") return;
    editTodo(todo.id, editingText); //custom hook usage
    setIsEditing(false);
  };
  // 編集をキャンセルする関数
  const handleCancelEditing = () => {
    setIsEditing(false);
    setEditingText(todo.text);
  };
  // 削除はAlertDialogで行う（下で使用）

  return (
    <li
      key={todo.id}
      className={`flex items-center rounded-md border p-3 transition-colors justify-between w-full space-x-2 ${
        todo.completed ? "bg-muted/50" : "bg-background"
      }`}
    >
      {/* custom hook usage */}
      <Checkbox
        id={`todo-${todo.id}`}
        checked={todo.completed}
        onCheckedChange={() => toggleTodo(todo.id)}
        className="cursor-pointer"
      />
      {/* 編集モードかどうか判定 */}
      {isEditing ? (
        <>
          <Input type="text" value={editingText} onChange={(e) => setEditingText(e.target.value)} />
          <div className="ml-auto flex">
            <Button size="icon" onClick={handleSave} className="h-8 w-8 mr-2 cursor-pointer">
              <Check className="h-4 w-4" />
            </Button>
            <Button size="icon" onClick={handleCancelEditing} className="h-8 w-8 cursor-pointer">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </>
      ) : (
        <>
          <span className={`text-sm break-all text-left w-full ml-2 ${todo.completed ? "line-through" : ""}`}>
            {todo.text}
          </span>
          <div className="ml-auto flex">
            <Button size="icon" onClick={() => setIsEditing(true)} className="h-8 w-8 mr-2 cursor-pointer">
              <Pencil className="h-4 w-4" />
            </Button>
            {/* // タスクを削除する関数 */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button size="icon" className="h-8 w-8 text-destructive hover:text-destructive cursor-pointer">
                  <Trash2 className="h-4 w-4 " />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>タスクを削除しますか？</AlertDialogTitle>
                  <AlertDialogDescription className="break-all text-left">
                    この操作は取り消せません。タスク「{todo.text}」を本当に削除してよろしいですか？
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="cursor-pointer">キャンセル</AlertDialogCancel>
                  <AlertDialogAction onClick={() => deleteTodo(todo.id)} className="cursor-pointer">
                    削除
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </>
      )}
    </li>
  );
};
