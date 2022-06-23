import { createContext, useReducer } from "react";
import { boardReducer } from "../Reducers/board";

export const BoardContext = createContext();

const BoardProvider = ({ children }) => {
  const [boards, dispatchBoardAction] = useReducer(boardReducer, []);
  return (
    <BoardContext.Provider value={{ boards, dispatchBoardAction }}>
      {children}
    </BoardContext.Provider>
  );
};

export default BoardProvider;
