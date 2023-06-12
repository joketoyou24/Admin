import "./createGeneralStatus.scss";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../LoginForm/ErrorMessage";
import React, { useState, useContext } from "react";
import { UserContext } from "../../context/userContext";

const CreateGeneralStatus = () => {
  const [token] = useContext(UserContext);
  const [status, setStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const cleanFormData = () => {
    setStatus("");
  };

  const handleCreate = async () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        status_desc: status,
      }),
    };
    const response = await fetch("/status", requestOptions);
    if (!response.ok) {
      setErrorMessage("Something went wrong when creating status");
    } else {
      navigate("/generalstatus");
      cleanFormData();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (status.length > 0) {
      handleCreate();
    } else {
      setErrorMessage("Please fill the status field!");
    }
  };

  return (
    <div className="content__box">
      <form onSubmit={handleSubmit}>
        <div className="input__row1">
          <div className="input__col1">
            <label className="toText">General Status</label>
            <input
              type="text"
              placeholder="Enter Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="input__box"
            />
          </div>
        </div>
        <div className="contentBoxNew__form">
          <div className="formAddnew">
            <button className="button__addnew">Add new</button>
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

export default CreateGeneralStatus;
