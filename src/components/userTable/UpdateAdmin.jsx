import "./updateAdmin.scss";
import UpdateIcon from "@mui/icons-material/Update";
import ErrorMessage from "../LoginForm/ErrorMessage";

import React, { useEffect, useState } from "react";

const UpdateAdmin = ({ active, handleModal, token, id }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const getAdmin = async () => {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const response = await fetch(`/admin/${id}`, requestOptions);

      if (!response.ok) {
        setErrorMessage("Could not get the lead");
      } else {
        const data = await response.json();
        setEmail(data.email);
        setName(data.name);
        setPassword(data.password);
      }
    };

    if (id) {
      getAdmin();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, token]);

  const cleanFormData = () => {
    setEmail("");
    setName("");
    setPassword("");
  };

  const handleUpdate = async () => {
    const requestOptions = {
      method: "PUT",
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
    const response = await fetch(`/admin/${id}`, requestOptions);
    if (!response.ok) {
      setErrorMessage("Something went wrong when updating admin account");
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
    if (password.length > 4 && email.length > 9) {
      handleUpdate();
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
    <div className={`modal ${active && "is-active"}`}>
      <div className="wrapper">
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

export default UpdateAdmin;
