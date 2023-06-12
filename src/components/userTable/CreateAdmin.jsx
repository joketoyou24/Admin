import "./createAdmin.scss";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../LoginForm/ErrorMessage";
import React, { useState } from "react";

const NewAdmin = ({ token }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const cleanFormData = () => {
    setEmail("");
    setName("");
    setPassword("");
  };

  const handleCreate = async () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        email: email,
        name: name,
        password: password,
      }),
    };
    const response = await fetch("/admin", requestOptions);
    if (!response.ok) {
      setErrorMessage("Something went wrong when creating admin account");
    } else {
      navigate("/user");
      cleanFormData();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.length > 4 && email.length > 9) {
      handleCreate();
    } else if (email.length === 0) {
      setErrorMessage("Please fill the email field!");
    } else if (name.length === 0) {
      setErrorMessage("Please fill the name field!");
    } else if (password.length === 0) {
      setErrorMessage("Please fill the password field!");
    } else {
      setErrorMessage("Ensure that the password greater than 4 characters");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="top">
          <div className="input__container">
            <label className="label">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
            />
          </div>
          <div className="input__container">
            <label className="label">Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input"
              required
            />
          </div>
        </div>
        <div className="bottom">
          <div className="input__container">
            <label className="label">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
            />
          </div>
        </div>
        <div className="addButton__container">
          <div className="addButton__wrapper">
            <label htmlFor="add">
              <AddIcon className="icon" />
              Add New
            </label>
            <input type="submit" id="add" className="add__btn" />
          </div>
        </div>
        <div className="error__container">
          <div className="error">
            <ErrorMessage message={errorMessage} />
            <br />
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewAdmin;
