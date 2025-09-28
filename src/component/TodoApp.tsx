import React, { useState } from "react";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

const TodoApp = () => {
  // 状態管理 - State management
  const [todos, setTodos] = useState<Todo[]>([]);

  //   新しいTodoを追加する関数 - Add new todo Function
  const [newTodo, setNewTodo] = useState<string>("");
  console.log(newTodo);

  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState<string>("");

  //   新しいTodoを追加する関数 - Add new todo Function
  const handleAddTodo = () => {
    // prevent insert empty item on input
    if (newTodo.trim() === "") return;

    //   新しいTodoを作成 - Create new todo
    const newTask: Todo = {
      id: Date.now(),
      text: newTodo,
      completed: false,
    };
    setTodos([...todos, newTask]);

    //   入力フィールドをクリア - Clear input field
    setNewTodo("");
  };

  // 完了状態を切り替える関数 - Function to swap task done condition/state
  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
            }
          : todo
      )
    );
  };

  // 編集を始める関数
  const handleStartEditing = (id: number, currentText: string) => {
    setEditingTodoId(id);
    setEditingText(currentText);
  };

  // 編集内容を保存する関数
  const handleSaveEditing = () => {
    if (editingTodoId == null) return; //編集中でなければ何もしない

    // 編集したものを更新する
    setTodos(todos.map((todo) => (todo.id === editingTodoId ? { ...todo, text: editingText } : todo)));

    // 編集モードの終了
    setEditingTodoId(null);
    setEditingText("");
  };

  // 編集をキャンセルする関数
  const handleCancelEditing = () => {
    setEditingTodoId(null);
    setEditingText("");
  };

  // タスクを削除する関数
  const handleDeleteTodo = (Deleteid: number) => {
    setTodos(todos.filter((todo) => todo.id !== Deleteid));
  };

  // 未完了のタスク数をカウントする - Count Incomplete task
  const incompleteTodos: number = todos.filter((todo) => !todo.completed).length;

  return (
    <div>
      <h1>TodoList</h1>
      <input type="text" value={newTodo} name="" id="newTodo" onChange={(e) => setNewTodo(e.target.value)} />
      <button onClick={handleAddTodo}>Add</button>
      <p>未完了のタスク： {incompleteTodos} 件</p>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} style={{ margin: "10px 0" }}>
            <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id)} />
            {/* 編集モードかどうか判定 */}
            {editingTodoId === todo.id ? (
              <>
                <input type="text" value={editingText} onChange={(e) => setEditingText(e.target.value)} />
                <button type="button" onClick={handleSaveEditing}>
                  保存
                </button>
                <button type="button" onClick={handleCancelEditing}>
                  キャンセル
                </button>
              </>
            ) : (
              <>
                <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>{todo.text}</span>
                <button type="button" onClick={() => handleStartEditing(todo.id, todo.text)}>
                  編集
                </button>
                <button type="button" onClick={() => handleDeleteTodo(todo.id)}>
                  削除
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
