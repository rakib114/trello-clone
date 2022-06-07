const boardReducer = (boards = [], action) => {
  switch (action.type) {
    case "CREATE_BOARD": {
      const board = {
        id: Date.now(),
        title: action.payload.title,
        taskList: [],
        tasks: [],
        caretedAt: new Date().toLocaleDateString(),
      };
      return [...boards, board];
    }
    case "UPDATE_BOARD": {
      const tobeUpdatedBoard = boards.find(
        (item) => item.id === action.payload.id
      );
      return boards.map((board) => {
        if (board.id === tobeUpdatedBoard.id) {
          board.title = tobeUpdatedBoard.title;
        }
        return board;
      });
    }
    case "DELETE_BOARD": {
      return boards.filter((board) => board.id !== action.payload.id);
    }

    default: {
      return boards;
    }
  }
};
