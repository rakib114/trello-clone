import React, { useContext, useState } from "react";
import { BoardContext } from "../../contexts/Board";

const BoardForm = () => {
  const [boardTitle, setBoardTitle] = useState("");
  const { dispatchBoardAction } = useContext(BoardContext);

  return (
    <div className="align-center m-top-md">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (boardTitle) {
            dispatchBoardAction({
              type: "CREATE_BOARD",
              payload: { title: boardTitle },
            });
            setBoardTitle("");
          } else {
            alert("Please Provide a Board Name");
          }
        }}
      >
        <input
          type="text"
          name="boardTitle"
          value={boardTitle}
          onChange={(e) => setBoardTitle(e.target.value)}
        />
        <button type="submit">Create Board</button>
      </form>
    </div>
  );
};

export default BoardForm;
