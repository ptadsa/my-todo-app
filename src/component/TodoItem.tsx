import React, { useState } from "react";
import type { Todo } from "../reducers/TodoReducer";
import { useTodo } from "../context/todoContext";

type TodoItemProps = {
  todo: Todo;
};

export const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingText, setEditingText] = useState<string>(todo.text);

  const { dispatch } = useTodo();

  const handleSave = () => {
    if (editingText.trim() === "") return;
    dispatch({ type: "EDIT_TODO", id: todo.id, text: editingText });
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
      dispatch({ type: "DELETE_TODO", id: todo.id });
    }
  };

  return (
    <li key={todo.id} style={{ margin: "10px 0" }}>
      <input type="checkbox" checked={todo.completed} onChange={() => dispatch({ type: "TOGGLE_TODO", id: todo.id })} />
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
