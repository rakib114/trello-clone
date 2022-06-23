import React, { useContext } from "react";
import { BoardContext } from "../../contexts/Board";
import { TaskContext } from "../../contexts/Task";
import { TaskListContext } from "../../contexts/TaskList";
import crossICon from "../../assest/icons/cross.png";

const BoardIteam = ({ board }) => {
  const { dispatchBoardAction } = useContext(BoardContext);
  const { tasks, dispatchTaskAction } = useContext(TaskContext);
  const { taskLists, disPatchListAction } = useContext(TaskListContext);

  const removeBoardHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const listsToBeDeleted = taskLists.filter(
      (list) => list.boardId === board.id
    );
    const taskToBeDeleted = tasks.filter((task) => task.boardId === board.id);
    dispatchBoardAction({ type: "DELETE_BOARD", payload: { id: board.id } });
    listsToBeDeleted.forEach((list) => {
      disPatchListAction({ type: "DELETE_LIST", payload: { id: list.id } });
    });
    taskToBeDeleted.forEach((task) => {
      dispatchTaskAction({ type: "DELETE_TASK", payload: { id: task.id } });
    });
  };

  return (
    <div className="board-box d-flex flex-direction-column">
      <div className="d-flex justify-content-between">
        <h5 className="title-gap">{board.title}</h5>
        <img
          src={crossICon}
          alt="Delete Board"
          className="add-item-icon"
          onClick={(e) => removeBoardHandler(e)}
        />
      </div>
      <p className="title-gap align-self-flex-end">
        This Board has {board.taskLists.length} List
      </p>
    </div>
  );
};

export default BoardIteam;
