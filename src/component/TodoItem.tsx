import React, { useState } from "react";
import type { Todo } from "../reducers/TodoReducer";
import { useTodo } from "../context/TodoContext";

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
  // タスクを削除する関数
  const handleDelete = () => {
    const confirmDelete = window.confirm("本当にこのタスクを削除しますか？");
    if (confirmDelete) {
      deleteTodo(todo.id); //custom hook usage
    }
  };

  return (
    <li key={todo.id} style={{ margin: "10px 0" }}>
      {/* custom hook usage */}
      <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id)} />
      {/* 編集モードかどうか判定 */}
      {isEditing ? (
        <>
          <input type="text" value={editingText} onChange={(e) => setEditingText(e.target.value)} />
          <button type="button" onClick={handleSave}>
            保存
          </button>
          <button type="button" onClick={handleCancelEditing}>
            キャンセル
          </button>
        </>
      ) : (
        <>
          <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>{todo.text}</span>
          <button type="button" onClick={() => setIsEditing(true)}>
            編集
          </button>
          <button type="button" onClick={() => handleDelete()}>
            削除
          </button>
        </>
      )}
    </li>
  );
};
