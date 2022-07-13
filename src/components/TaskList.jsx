import React, { useContext } from "react";
import { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import { BoardContext } from "../contexts/Board";
import { TaskContext } from "../contexts/Task";
import { TaskListContext } from "../contexts/TaskList";
import crossIcon from "../assest/icons/cross.png";
import TaskCard from "./TaskCard";
import AddIteamForm from "./AddIteamForm";
import AddIteam from "./AddIteam";

const TaskList = ({ taskList }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [editMood, setEditMood] = useState(false);

  const { title } = taskList;
  const { tasks: allTask, dispatchTaskAction } = useContext(TaskContext);
  const { disPatchListAction } = useContext(TaskListContext);
  const { dispatchBoardAction } = useContext(BoardContext);

  const submitHandler = (e) => {
    e.preventDefault();
    const id = Date.now();

    dispatchTaskAction({
      type: "CREATE_TASK",
      payload: {
        id: id,
        title: taskTitle,
        taskListId: taskList.id,
        boardId: taskList.boardId,
      },
    });
    disPatchListAction({
      type: "ADD_TASK_ID_TO_LIST",
      payload: { id: taskList.id, taskId: id },
    });
    dispatchBoardAction({
      type: "ADD_TASK_ID_TO_BOARD",
      payload: { id: taskList.boardId, taskId: id },
    });
    setTaskTitle("");
    setEditMood(false);
  };

  const removeHandler = () => {
    disPatchListAction({ type: "DELETE_LIST", payload: { id: taskList.id } });
    dispatchBoardAction({
      type: "REMOVE_LIST_ID_FROM_BOARD",
      payload: { id: taskList.id },
    });
  };

  return (
    <Droppable droppableId={taskList.id + ""}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          <div className="list-container">
            <div className="list-title-container">
              <h5>{title}</h5>
              <img
                src={crossIcon}
                alt="Cross Icon"
                className="add-item-icon"
                onClick={removeHandler}
              />
            </div>
            {taskList.tasks
              .map((item) => {
                return allTask.find((t) => t.id === item);
              })
              ?.map((task, index) => (
                <TaskCard
                  index={index}
                  id={task.id}
                  taskList={taskList}
                  task={task}
                  key={task.id}
                />
              ))}
            {editMood ? (
              <AddIteamForm
                submitHandler={submitHandler}
                title={taskTitle}
                onChangeHandler={(e) => setTaskTitle(e.target.value)}
                setEditMood={setEditMood}
                editMood={editMood}
              />
            ) : (
              <AddIteam setEditMood={setEditMood} />
            )}
          </div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default TaskList;
