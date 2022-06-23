import { createContext, useReducer } from "react";
import { taskListReducer } from "../Reducers/taksList";

export const TaskListContext = createContext();

const TaskListProvider = ({ children }) => {
  const [taskLists, disPatchListAction] = useReducer(taskListReducer, []);
  return (
    <TaskListContext.Provider value={{ taskLists, disPatchListAction }}>
      {children}
    </TaskListContext.Provider>
  );
};

export default TaskListProvider;
