import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./sidebar.scss";
import myImage from "../../images/logo_telkom.png";
import HomeIcon from "@mui/icons-material/Home";
import BadgeIcon from "@mui/icons-material/Badge";
import CalendarViewDayIcon from "@mui/icons-material/CalendarViewDay";
import BackupTableIcon from "@mui/icons-material/BackupTable";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const Sidebar = () => {
  const [activePage, setActivePage] = useState("");
  const [showAttendanceDropdown, setShowAttendanceDropdown] = useState(false);
  const [showAdministrativeDropdown, setShowAdministrativeDropdown] = useState(false);
  const location = useLocation();
  const [, setLoggedIn] = useState(false);

  useEffect(() => {
    setActivePage(location.pathname);
  }, [location]);

  const toggleAttendanceDropdown = () => {
    setShowAttendanceDropdown(!showAttendanceDropdown);
  };

  const toggleAdministrativeDropdown = () => {
    setShowAdministrativeDropdown(!showAdministrativeDropdown);
  };

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    setLoggedIn(false); 
    window.location.href = "/"; 
  };

  return (
    <div className="sidebar">
      <Link to="/home" className="link">
        <div className="top">
          <img className="logo" src={myImage} alt="Logo Telkom" />
          <span className="title">Admin Telkom</span>
        </div>
      </Link>
      <div className="center">
        <ul>
          <li
            className={`sidebar-item ${activePage === "/home" ? "active" : ""}`}
          >
            <Link to="/home" className="link">
              <HomeIcon className="icon" />
              <span>Overview</span>
            </Link>
          </li>
          <li
            className={`sidebar-item ${
              activePage === "/employee" ? "active" : ""
            }`}
          >
            <Link to="/employee" className="link">
              <BadgeIcon className="icon" />
              <span>Employee</span>
            </Link>
          </li>
          <li
            className={`sidebar-item ${
              activePage === "/attendance" ? "active" : ""
            }`}
          >
            <div className="dropdown-container">
              <div
                className="dropdown-header"
                onClick={toggleAttendanceDropdown}
              >
                <CalendarViewDayIcon className="icon" />
                <span>Attendance</span>
                <ArrowForwardIosIcon
                  className={`arrow__icon ${
                    showAttendanceDropdown ? "arrow__icon--active" : ""
                  }`}
                />
              </div>
              {showAttendanceDropdown && (
                <ul className="dropdown-list">
                  <li>
                    <Link to="/attendance" className="link">
                      <span>Attendance</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/attendanceStatus" className="link">
                      <span>Status</span>
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </li>
          <li
            className={`sidebar-item ${
              activePage === "/administrative" ? "active" : ""
            }`}
          >
            <div className="dropdown-container">
              <div
                className="dropdown-header"
                onClick={toggleAdministrativeDropdown}
              >
                <BackupTableIcon className="icon" />
                <span>Administrative</span>
                <ArrowForwardIosIcon
                  className={`arrow__icon ${
                    showAdministrativeDropdown ? "arrow__icon--active" : ""
                  }`}
                />
              </div>
              {showAdministrativeDropdown && (
                <ul className="dropdown-list">
                  <li>
                    <Link to="/administrative" className="link">
                      <span>Job Title</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/generalstatus" className="link">
                      <span>General Status</span>
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </li>
          <li
            className={`sidebar-item ${activePage === "/user" ? "active" : ""}`}
          >
            <Link to="/user" className="link">
              <ReceiptLongIcon className="icon" />
              <span>User</span>
            </Link>
          </li>
          <li>
            <div className="link" onClick={handleLogout}>
              <LogoutIcon className="icon" />
              <span>Logout</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
