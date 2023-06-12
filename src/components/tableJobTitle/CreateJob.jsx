import "./createJob.scss";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../LoginForm/ErrorMessage";
import React, { useState, useContext } from "react";
import { UserContext } from "../../context/userContext";

const CreateJob = () => {
  const [token] = useContext(UserContext);
  const [job, setJob] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const cleanFormData = () => {
    setJob("");
  };

  const handleCreate = async () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        job_role: job,
      }),
    };
    const response = await fetch("/job", requestOptions);
    if (!response.ok) {
      setErrorMessage("Something went wrong when creating job title");
    } else {
      navigate("/administrative");
      cleanFormData();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (job.length > 0) {
      handleCreate();
    } else {
      setErrorMessage("Please fill the job field!");
    }
  };

  return (
    <div className="content__box">
      <form onSubmit={handleSubmit}>
        <div className="input__row1">
          <div className="input__col1">
            <label className="toText">Job Title</label>
            <input
              type="text"
              placeholder="Enter Job Title"
              value={job}
              onChange={(e) => setJob(e.target.value)}
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

export default CreateJob;
