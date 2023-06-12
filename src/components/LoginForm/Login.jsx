import "./login.scss";
import React, { useState, useContext } from "react";
import ErrorMessage from "./ErrorMessage";
import { UserContext } from "../../context/userContext";


const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [, setToken] = useContext(UserContext);

  // const navigate = useNavigate();

  const submitLogin = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: JSON.stringify(
        `grant_type=&username=${email}&password=${password}&scope=&client_id=&client_secret=`
      ),
    };
  
    const response = await fetch("/login", requestOptions);
    const data = await response.json();
  
    if (!response.ok) {
      setErrorMessage(data.detail);
    } else {
      setToken(data.access_token);
      window.location.href = "/home";
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    submitLogin();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form__wrapper">
        <div className="email">
          <label htmlFor="email">Email</label>
          <div className="input__gap">
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input__box"
              required
            />
          </div>
        </div>
        <div className="password">
          <label htmlFor="password">Password</label>
          <div className="input__gap">
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input__box"
              required
            />
          </div>
        </div>
        <ErrorMessage message={errorMessage} />
        <br />
        <div className="submit">
          <button className="submit__box" type="submit">
            Login
          </button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
