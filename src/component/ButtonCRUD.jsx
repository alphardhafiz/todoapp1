import React from "react";
import { Link } from "react-router-dom";

const ButtonCRUD = () => {
  return (
    <div className="add-button">
      <div className="user-button">
        <Link to="/add-user" class="button-adduser">
          Add User
        </Link>
        <Link to="/user-list" class="button-adduser">
          User List
        </Link>
      </div>
      <Link to="/add-task" class="button-adduser">
        Add Task
      </Link>
    </div>
  );
};

export default ButtonCRUD;
