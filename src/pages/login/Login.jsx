import React from "react";
import "./login.scss";
import myImage from "../../images/telkomLogo.png";
import LoginForm from "../../components/LoginForm/Login";

const Login = () => {
  return (
    <div className="login">
      <div className="login__container">
        <div className="form__container">
          <div className="form__left">
            <img className="logo" src={myImage} alt="Logo Telkom" />
          </div>
          <div className="form__right">
            <div className="form">
              <div className="tittle">
                <span className="tittle__up">Selamat Datang!</span>
                <span>Admin Panel Telkom</span>
              </div>
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
