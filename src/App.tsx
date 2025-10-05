import React from "react";
import "./App.css";
import TodoApp from "./component/TodoApp";
import { TodoProvider } from "./context/todoContext";

function App() {
  return (
    <TodoProvider>
      <TodoApp />
    </TodoProvider>
  );
}

export default App;
