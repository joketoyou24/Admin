import "./updateAttendance.scss";
import UpdateIcon from "@mui/icons-material/Update";
import ErrorMessage from "../LoginForm/ErrorMessage";

import React, { useEffect, useState } from "react";

const UpdateAttendance = ({ active, handleModal, token, id }) => {
  const [attendance, setAttendance] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [attendanceStatusOptions, setAttendanceStatusOptions] = useState([]);

  useEffect(() => {
    const getAttendanceStatusOptions = async () => {
      try {
        const requestOptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        };
        const response = await fetch("/attendance_status", requestOptions);
        if (!response.ok) {
          setErrorMessage("Something went wrong. Couldn't load the leads");
        }
        const statusData = await response.json();
        setAttendanceStatusOptions(statusData);
      } catch (error) {
        setErrorMessage("Couldn't fetch attendance status options");
      }
    };
    getAttendanceStatusOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    const getAttendance = async () => {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const response = await fetch(`/attendance/${id}`, requestOptions);

      if (!response.ok) {
        setErrorMessage("Could not get the table");
      } else {
        const data = await response.json();
        setAttendance(data.attendance);
      }
    };

    if (id) {
      getAttendance();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, token]);

  const cleanFormData = () => {
    setAttendance("");
  };

  const handleUpdate = async () => {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        attendance_status_id: attendance,
      }),
    };
    const response = await fetch(`/attendance/${id}`, requestOptions);
    if (!response.ok) {
      setErrorMessage("Something went wrong when updating attendance");
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

  console.log(attendance);
  return (
    <div className={`modal ${active && "is-active"}`}>
      <div className="wrapper">
        <div>
          <form onSubmit={handleSubmit}>
            <div className="top">
              <div className="input__container">
                <label className="label">Attendance</label>
                <select
                  size="1"
                  value={attendance}
                  onChange={(e) => setAttendance(e.target.value)}
                  className="input select"
                  placeholder="Select Status"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select Status
                  </option>
                  {attendanceStatusOptions &&
                    attendanceStatusOptions.map((option) => (
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

export default UpdateAttendance;
