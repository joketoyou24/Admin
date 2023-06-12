import "./updateJob.scss";
import UpdateIcon from "@mui/icons-material/Update";
import ErrorMessage from "../LoginForm/ErrorMessage";

import React, { useEffect, useState } from "react";

const UpdateJob = ({ active, handleModal, token, id }) => {
  const [job, setJob] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const getJob = async () => {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const response = await fetch(`/job/${id}`, requestOptions);

      if (!response.ok) {
        setErrorMessage("Could not get the lead");
      } else {
        const data = await response.json();
        setJob(data.job);
      }
    };

    if (id) {
      getJob();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, token]);

  const cleanFormData = () => {
    setJob("");
  };

  const handleUpdate = async () => {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        job_role: job,
      }),
    };
    const response = await fetch(`/job/${id}`, requestOptions);
    if (!response.ok) {
      setErrorMessage("Something went wrong when updating job account");
    } else {
      cleanFormData();
      handleModal();
    }
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (e.target.classList.contains("modal")) {
        handleModal();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [handleModal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (job.length > 0) {
      handleUpdate();
    } else {
      setErrorMessage("Please fill the job field!");
    }
  };

  return (
    <div className={`modal ${active && "is-active"}`}>
      <div className="wrapper">
        <div>
          <form onSubmit={handleSubmit}>
            <div className="top">
              <div className="input__container">
                <label className="label">Job title</label>
                <input
                  type="job"
                  placeholder="Enter job"
                  value={job}
                  onChange={(e) => setJob(e.target.value)}
                  className="input"
                />
              </div>
            </div>
            <div className="updateButton__container">
              <div className="updateButton__wrapper">
                <label htmlFor="update">
                  <UpdateIcon className="icon" />
                  Update
                </label>
                <input type="submit" id="update" className="update__btn" />
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
      </div>
    </div>
  );
};

export default UpdateJob;
