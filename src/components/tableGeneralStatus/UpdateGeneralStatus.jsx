import "./updateGeneralStatus.scss";
import UpdateIcon from "@mui/icons-material/Update";
import ErrorMessage from "../LoginForm/ErrorMessage";

import React, { useEffect, useState } from "react";

const UpdateGeneralStatus = ({ active, handleModal, token, id }) => {
  const [status, setStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const getStatus = async () => {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const response = await fetch(`/status/${id}`, requestOptions);

      if (!response.ok) {
        setErrorMessage("Could not get the table");
      } else {
        const data = await response.json();
        setStatus(data.status);
      }
    };

    if (id) {
      getStatus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, token]);

  const cleanFormData = () => {
    setStatus("");
  };

  const handleUpdate = async () => {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        status_desc: status,
      }),
    };
    const response = await fetch(`/status/${id}`, requestOptions);
    if (!response.ok) {
      setErrorMessage("Something went wrong when updating status account");
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
    if (status.length > 0) {
      handleUpdate();
    } else {
      setErrorMessage("Please fill the status field!");
    }
  };

  return (
    <div className={`modal ${active && "is-active"}`}>
      <div className="wrapper">
        <div>
          <form onSubmit={handleSubmit}>
            <div className="top">
              <div className="input__container">
                <label className="label">General Status</label>
                <input
                  type="status"
                  placeholder="Enter status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
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

export default UpdateGeneralStatus;
