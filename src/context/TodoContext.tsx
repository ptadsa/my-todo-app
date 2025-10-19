/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useReducer } from "react";
import { todoReducer, type Todo } from "../reducers/TodoReducer";
import { useLocalStorage } from "../hooks/useLocalStorage";

// コンテキストが持つ値の型
type TodoContextType = {
  todos: Todo[];
  // dispatch: Dispatch<TodoAction>;
  //custom hook
  addTodo: (text: string) => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  editTodo: (id: number, text: string) => void;
  incompleteTodoCount: number;
};

// コンテキストを作成 (default : undefined)
export const TodoContext = createContext<TodoContextType | undefined>(undefined);

// Provider コンポーネントを定義
type TodoProviderProps = {
  children: React.ReactNode;
};

export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
  // 1. useLocalStorageから初期値とセッターを取得
  const [initialTodos, setStoredTodos] = useLocalStorage<Todo[]>("todos", []);
  console.log(initialTodos);

  // 2. useReducerの初期値→ローカルストレージの値に変更
  const [todos, dispatch] = useReducer(todoReducer, initialTodos);

  // 3. todosの状態が変更されたら、ローカルストレージに更新を加える
  useEffect(() => {
    setStoredTodos(todos);
  }, [todos, setStoredTodos]);

  const addTodo = (text: string) => dispatch({ type: "ADD_TODO", text }); //custom hook add todo
  const toggleTodo = (id: number) => dispatch({ type: "TOGGLE_TODO", id }); //custom hook toggle todo
  const deleteTodo = (id: number) => dispatch({ type: "DELETE_TODO", id }); //custom hook delete todo
  const editTodo = (id: number, text: string) => dispatch({ type: "EDIT_TODO", id, text }); //custom hook edit todo

  // 未完了のタスク数をカウントする - Count Incomplete task
  const incompleteTodoCount: number = todos.filter((todo) => !todo.completed).length;

  const value = {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    incompleteTodoCount,
  };

  return <TodoContext.Provider value={value}> {children} </TodoContext.Provider>;
};

// コンテキストを簡単に利用するためのカスタムフック
export const useTodo = (): TodoContextType => {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error(" useTodo must be used within a TodoProvider");
  }
  return context;
};
