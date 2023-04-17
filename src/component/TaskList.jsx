import React, { useEffect, useState } from "react";
import { BsFillCheckCircleFill, BsFillTrashFill } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import { GiReturnArrow } from "react-icons/gi";
import axios from "axios";
import { Link } from "react-router-dom";

const TaskList = () => {
  const [incompleteTasks, setIncompleteTask] = useState([]);
  const [completeTasks, setCompleteTask] = useState([]);

  const getTask = async () => {
    try {
      const response = await axios.get("http://localhost:5000/tasks");
      const tasks = response.data;
      const incompleteTasks = tasks.filter((v) => v.status === false);
      const completeTask = tasks.filter((v) => v.status === true);
      setIncompleteTask(incompleteTasks);
      setCompleteTask(completeTask);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getTask();
  }, []);

  const toComplete = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/tasks/status/${id}`, {
        status: true,
      });
      getTask();
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.msg);
      }
    }
  };

  const toIncomplete = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/tasks/status/${id}`, {
        status: false,
      });
      getTask();
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`);
      getTask();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="task">
      <div className="incomplete">
        <h2>INCOMPLETE</h2>
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Task</th>
              <th>Due Date</th>
              <th>Users</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {incompleteTasks.map((v, i) => (
              <tr key={v.id}>
                <td>{i + 1}</td>
                <td>{v.name}</td>
                <td>{v.dueDate.split("T")[0]}</td>
                <td>{v.user.name}</td>
                <td>
                  <button
                    onClick={() => toComplete(v.id)}
                    className="complete-button"
                  >
                    <BsFillCheckCircleFill />
                  </button>
                  <Link to={`/edit-task/${v.id}`}>
                    <button className="edit-button">
                      <BiEditAlt />
                    </button>
                  </Link>
                  <button
                    onClick={() => deleteTask(v.id)}
                    className="delete-button"
                  >
                    <BsFillTrashFill />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="complete">
        <h2>COMPLETE</h2>
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Task</th>
              <th>Due Date</th>
              <th>Users</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {completeTasks.map((v, i) => (
              <tr key={v.id}>
                <td>{i + 1}</td>
                <td>{v.name}</td>
                <td>{v.dueDate.split("T")[0]}</td>
                <td>{v.user.name}</td>
                <td>
                  <button
                    onClick={() => toIncomplete(v.id)}
                    className="complete-button return-button"
                  >
                    <GiReturnArrow />
                  </button>
                  <Link to={`/edit-task/${v.id}`}>
                    <button className="edit-button">
                      <BiEditAlt />
                    </button>
                  </Link>
                  <button
                    onClick={() => deleteTask(v.id)}
                    className="delete-button"
                  >
                    <BsFillTrashFill />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskList;
