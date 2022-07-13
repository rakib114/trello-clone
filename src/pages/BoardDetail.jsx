import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { DragDropContext } from "react-beautiful-dnd";
import AddIteam from "../components/AddIteam";
import AddIteamForm from "../components/AddIteamForm";
import TaskList from "../components/TaskList";
import { BoardContext } from "../contexts/Board";
import { TaskListContext } from "../contexts/TaskList";
import { TaskContext } from "../contexts/Task";

const BoardDetail = () => {
  const [listTitle, setListTitle] = useState("");
  const [editModd, setEditModd] = useState(false);
  let { boardId } = useParams();
  const { taskLists, disPatchListAction } = useContext(TaskListContext);
  const { dispatchBoardAction } = useContext(BoardContext);
  const { dispatchTaskAction } = useContext(TaskContext);

  const submitHandler = (e) => {
    e.preventDefault();
    const id = Date.now();
    disPatchListAction({
      type: "CREATE_LIST",
      payload: { id: id, boardId: boardId, title: listTitle },
    });
    dispatchBoardAction({
      type: "ADD_LIST_ID_TO_BOARD",
      payload: { id: boardId, taskListId: id },
    });
    setListTitle("");
    setEditModd(false);
  };
  const dragEndHandler = (result) => {
    console.log(result);
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (destination.droppableId !== source.droppableId) {
      disPatchListAction({
        type: "REMOVE_TASK_ID_FORM_LIST",
        payload: {
          id: parseInt(source.droppableId),
          taskId: parseInt(draggableId),
        },
      });
      disPatchListAction({
        type: "ADD_TASK_ID_TO_LIST",
        payload: {
          id: parseInt(destination.droppableId),
          taskId: parseInt(draggableId),
        },
      });
      dispatchTaskAction({
        type: "CHANGE_LIST_ID_OF_TASK",
        payload: {
          id: parseInt(draggableId),
          taskListId: parseInt(destination.droppableId),
        },
      });
    } else if (destination.droppableId === source.droppableId) {
      disPatchListAction({
        type: "SORT_TASK_ID_IN_LIST",
        payload: {
          targetIndex: parseInt(destination.index),
          sourceIndex: parseInt(source.index),
          droppableId: parseInt(source.droppableId),
        },
      });
    }
  };
  return (
    <DragDropContext onDragEnd={dragEndHandler}>
      <div className="d-flex m-top-sm flex-direction-row">
        <Link to="/">Back to Boards </Link>
        {taskLists
          ?.filter((item) => item.boardId === boardId)
          ?.map((taskList) => (
            <TaskList taskList={taskList} key={taskList.id} />
          ))}
        {!editModd ? (
          <AddIteam listAddItem setEditMood={setEditModd} />
        ) : (
          <AddIteamForm
            setEditMood={setEditModd}
            listForm
            submitHandler={submitHandler}
            title={listTitle}
            onChangeHandler={(e) => setListTitle(e.target.value)}
          />
        )}
      </div>
    </DragDropContext>
  );
};

export default BoardDetail;
