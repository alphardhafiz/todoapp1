import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { BsFillTrashFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);

  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users");
      setUsers(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/users/${id}`);
      getUser();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="task">
      <div className="complete">
        <h2>USERS LIST</h2>
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((v, i) => (
              <tr key={v.id}>
                <td>{i + 1}</td>
                <td>{v.name}</td>
                <td>{v.email}</td>
                <td>
                  <Link to={`/edit-user/${v.id}`}>
                    <button className="edit-button">
                      <BiEditAlt />
                    </button>
                  </Link>
                  <button
                    onClick={() => deleteUser(v.id)}
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
      <Link to={"/"} className="btn">
        Back to Home
      </Link>
    </div>
  );
};

export default UserList;
