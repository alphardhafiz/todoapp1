import React, { useEffect, useState } from "react";
import "../style/FormTaskStyle.css";
import axios from "axios";
import { useNavigate } from "react-router";

const FormTask = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [userId, setUserId] = useState(0);
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users");
      setUsers(response.data);
      setUserId(response.data[0].id);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const saveTask = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/tasks", {
        name,
        due_date: dueDate,
        user_id: userId,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="form-container task">
      <form onSubmit={saveTask}>
        <div className="control">
          <label htmlFor="name">Task</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="task"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="control">
          <label htmlFor="due_date">Due Date</label>
          <input
            type="date"
            id="due_date"
            name="due_date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <div className="control">
          <label htmlFor="user_id">User</label>
          <select
            name="user_id"
            id="user_id"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          >
            {users.map((user, index) => (
              <option key={index} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
        <div className="control">
          <button className="btn-form" type="submit">
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormTask;
