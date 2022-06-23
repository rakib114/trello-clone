import React from "react";
import crossIcon from "../assest/icons/cross.png";

const AddIteamForm = ({
  listForm,
  submitHandler,
  title,
  onChangeHandler,
  setEditMood,
}) => {
  const createHandler = (e) => {
    if (title !== "") {
      submitHandler(e);
    } else {
      alert("Please Provide a Valid Title");
    }
  };
  return (
    <div className="form-container">
      <div className="form-card">
        <form onSubmit={(e) => createHandler(e)}>
          <textarea
            cols="30"
            rows="2"
            autoFocus
            placeholder={
              listForm ? "Enter The List Title" : "Enter a Title for this Task"
            }
            value={title}
            onChange={onChangeHandler}
            className="form-textarea"
          ></textarea>
        </form>
      </div>
      <div className="button-container">
        <button
          className="add-button"
          onClick={(e) => {
            createHandler();
          }}
        >
          {listForm ? "Add List" : "Add Task"}
        </button>
        <img
          src={crossIcon}
          alt="Cross Icon"
          className="form-icon"
          onClick={setEditMood(false)}
        />
      </div>
    </div>
  );
};

export default AddIteamForm;
