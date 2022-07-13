import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { BoardContext } from "../contexts/Board";
import { TaskContext } from "../contexts/Task";
import { TaskListContext } from "../contexts/TaskList";
import AddIteamForm from "./AddIteamForm";
import crossIcon from "../assest/icons/cross.png";
import { Draggable } from "react-beautiful-dnd";

const TaskCard = ({ task, index }) => {
  const [taskTitle, setTaskTitle] = useState(task.title);
  const [editMood, setEditMood] = useState(false);
  const { dispatchBoardAction } = useContext(BoardContext);
  const { dispatchTaskAction } = useContext(TaskContext);
  const { disPatchListAction } = useContext(TaskListContext);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatchTaskAction({
      type: "UPDATE_TASK",
      payload: { id: task.id, title: taskTitle },
    });
    setEditMood(false);
  };

  const removeHandler = () => {
    dispatchTaskAction({ type: "DELETE_TASK", payload: { id: task.id } });
    disPatchListAction({
      type: "REMOVE_TASK_ID_FORM_LIST",
      payload: { id: task.taskListId, taskId: task.id },
    });
    dispatchBoardAction({
      type: "REMOVE_TASK_ID_FROM_BOARD",
      payload: { id: task.boardId, taskId: task.id },
    });
  };

  return (
    <Draggable draggableId={task.id + ""} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          {editMood ? (
            <AddIteamForm
              onChangeHandler={(e) => setTaskTitle(e.target.value)}
              title={taskTitle}
              setEditMood={setEditMood}
              submitHandler={submitHandler}
            />
          ) : (
            <div
              onClick={() => {
                setEditMood(true);
              }}
              className="task-card"
            >
              <p>{taskTitle}</p>
              <img
                src={crossIcon}
                alt="Cross Icon"
                onClick={removeHandler}
                className="add-item-icon"
              />
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
