export const taskListReducer = (taskLIsts, action) => {
  switch (action.type) {
    case "CREATE_LIST": {
      const taskList = {
        id: Date.now(),
        title: action.payload.title,
        tasks: [],
        boardId: action.payload.boardId,
      };
      return [...taskLIsts, taskList];
    }
    case "UPDATE_LIST": {
      return taskLIsts.map((tasktList) => {
        if (tasktList.id === action.payload.id) {
          tasktList.title = action.payload.title || tasktList.title;
        }
        return tasktList;
      });
    }
    case "DELETE_LIST": {
      return taskLIsts.filter((taskList) => taskList.id !== action.payload.id);
    }
    case "ADD_TASK_ID_TO_LIST": {
      return taskLIsts.map((taskList) => {
        if (taskList.id === action.payload.id) {
          taskList.tasks.push(action.payload.taskId);
        }
        return taskList;
      });
    }
    case "REMOVE_TASK_IF_FORM_LIST": {
      return taskLIsts.map((list) => {
        if (list.id === action.payload.id) {
          list.tasks = list.tasks.filter(
            (iteam) => iteam.id !== action.payload.taskId
          );
        }
        return list;
      });
    }
    case "CHANGE_BOARD_ID_OF_LIST": {
      return taskLIsts.map((list) => {
        if (list.id === action.payload.id) {
          list.boardId = action.payload.boardId;
        }
        return list;
      });
    }
    default: {
      return taskLIsts;
    }
  }
};
