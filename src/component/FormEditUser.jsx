import React, { useEffect, useState } from "react";
import "../style/FormAddUserStyle.css";
import axios from "axios";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";

const FormEditUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const getUserById = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/users/${id}`);
      setName(response.data.name);
      setEmail(response.data.email);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getUserById();
  }, []);

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/users/${id}`, {
        name,
        email,
      });
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="container-form">
      <form onSubmit={updateUser}>
        <div className="control">
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="control">
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="control">
          <button className="btn-form" type="submit">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormEditUser;
