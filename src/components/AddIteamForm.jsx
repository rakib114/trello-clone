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
            autoFocus
            placeholder={
              listForm ? "Enter the list title" : "Enter a title for this task"
            }
            value={title}
            onChange={onChangeHandler}
            className="form-textarea"
            name=""
            id=""
            cols="30"
            rows="2"
          ></textarea>
        </form>
      </div>
      <div className="button-container">
        <button
          className="add-button"
          onClick={(e) => {
            // e.stopPropagation();
            createHandler(e);
          }}
        >
          {listForm ? "Add list" : "Add task"}
        </button>
        <img
          onClick={(e) => {
            // e.stopPropagation();
            setEditMood(false);
          }}
          className="form-icon"
          src={crossIcon}
          alt=""
        />
      </div>
    </div>
  );
};

export default AddIteamForm;
