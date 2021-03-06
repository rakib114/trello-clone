import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import BoardProvider from "./contexts/Board";
import TaskListProvider from "./contexts/TaskList";
import TaskProvider from "./contexts/Task";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BoardProvider>
    <TaskListProvider>
      <TaskProvider>
        <App />
      </TaskProvider>
    </TaskListProvider>
  </BoardProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
