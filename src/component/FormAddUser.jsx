import React, { useState } from "react";
import "../style/FormAddUserStyle.css";
import axios from "axios";
import { useNavigate } from "react-router";

const FormAddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const saveUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/users", {
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
      <form onSubmit={saveUser}>
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
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormAddUser;
