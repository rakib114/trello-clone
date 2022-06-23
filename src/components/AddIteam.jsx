import React from "react";
import pluIcon from "../assest/icons/plus.png";
const AddIteam = ({ listAddItem, setEditMood }) => {
  return (
    <div
      onClick={() => setEditMood(true)}
      className={
        listAddItem ? "add-item list-add-item" : "add-item task-add-item"
      }
    >
      <img src={pluIcon} alt="Add Icon" className="add-item-icon" />
      <p className="add-item-text">
        {listAddItem ? "Add Another List" : "Add a Card"}
      </p>
    </div>
  );
};

export default AddIteam;
