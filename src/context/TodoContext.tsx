/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useReducer, type Dispatch } from "react";
import { todoReducer, type Todo, type TodoAction } from "../reducers/TodoReducer";

// コンテキストが持つ値の型
type TodoContextType = {
  todos: Todo[];
  dispatch: Dispatch<TodoAction>;
};

// コンテキストを作成 (default : undefined)
export const TodoContext = createContext<TodoContextType | undefined>(undefined);

// Provider コンポーネントを定義
type TodoProviderProps = {
  children: React.ReactNode;
};

export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
  const [todos, dispatch] = useReducer(todoReducer, []);

  return <TodoContext.Provider value={{ todos, dispatch }}> {children} </TodoContext.Provider>;
};

// コンテキストを簡単に利用するためのカスタムフック
export const useTodo = (): TodoContextType => {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error(" useTodo must be used within a TodoProvider");
  }
  return context;
};
