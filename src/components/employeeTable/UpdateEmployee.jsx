import "./updateEmployee.scss";
import UpdateIcon from "@mui/icons-material/Update";
import ErrorMessage from "../LoginForm/ErrorMessage";
import React, { useState, useEffect } from "react";

const UpdateEmployee = ({ active, handleModal, token, id }) => {
  const [nik, setNik] = useState("");
  const [gender, setGender] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [job, setJob] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [jobOptions, setJobOptions] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]);

  useEffect(() => {
    const getJobOptions = async () => {
      try {
        const requestOptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        };
        const response = await fetch("/job", requestOptions);
        if (!response.ok) {
          setErrorMessage(
            "Something went wrong. Couldn't load the job options"
          );
        }
        const jobData = await response.json();
        setJobOptions(jobData);
      } catch (error) {
        setErrorMessage("Couldn't fetch job options");
      }
    };

    const getStatusOptions = async () => {
      try {
        const requestOptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        };
        const response = await fetch("/status", requestOptions);
        if (!response.ok) {
          setErrorMessage(
            "Something went wrong. Couldn't load the status options"
          );
        }
        const statusData = await response.json();
        setStatusOptions(statusData);
      } catch (error) {
        setErrorMessage("Couldn't fetch status options");
      }
    };

    getJobOptions();
    getStatusOptions();
  }, [token]);

  useEffect(() => {
    const getEmployees = async () => {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const response = await fetch(`/employee/${id}`, requestOptions);

      if (!response.ok) {
        setErrorMessage("Could not get the table");
      } else {
        const data = await response.json();
        setNik(data.NIK);
        setGender(data.gender);
        setName(data.name);
        setJob(data.job_id);
        setStatus(data.general_status_id);
      }
    };

    if (id) {
      getEmployees();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, token]);

  const cleanFormData = () => {
    setNik("");
    setGender("");
    setName("");
    setStatus("");
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
        name: name,
        NIK: nik,
        gender: gender,
        job_id: job,
        general_status_id: status,
      }),
    };
    const response = await fetch(`/employee/${id}`, requestOptions);
    if (!response.ok) {
      setErrorMessage("Something went wrong when updating employee");
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
    handleUpdate();
  };

  return (
    <div className={`modal ${active && "is-active"}`}>
      <div className="wrapper">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="top">
              <div className="input__container">
                <label htmlFor="nik">NIK</label>
                <input
                  className="input"
                  type="number"
                  id="nik"
                  placeholder="NIK..."
                  value={nik}
                  onChange={(e) => setNik(e.target.value)}
                />
              </div>
              <div className="input__container">
                <label htmlFor="gender">Gender</label>
                <select
                  className="input"
                  id="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="" disabled>
                    Select gender
                  </option>
                  <option value="Pria">Pria</option>
                  <option value="Wanita">Wanita</option>
                </select>
              </div>
            </div>
            <div className="center">
              <div className="input__container">
                <label htmlFor="name">Name</label>
                <input
                  className="input"
                  type="text"
                  id="name"
                  placeholder="Name..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="input__container">
                <label htmlFor="job">Job Title</label>
                <select
                  className="input"
                  id="job"
                  value={job}
                  onChange={(e) => setJob(e.target.value)}
                >
                  <option value="" disabled>
                    Select Job
                  </option>
                  {jobOptions &&
                    jobOptions.map((option) => (
                      <option key={option.job_role} value={option.id}>
                        {option.job_role}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className="bottom">
              <div className="input__container">
                <label htmlFor="status">Status</label>
                <select
                  className="input"
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="" disabled>
                    Select Status
                  </option>
                  {statusOptions &&
                    statusOptions.map((option) => (
                      <option key={option.status_desc} value={option.id}>
                        {option.status_desc}
                      </option>
                    ))}
                </select>
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
          </form>
          <div className="error__container">
            <ErrorMessage message={errorMessage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateEmployee;
