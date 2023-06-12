import React, { useEffect, useState } from "react";
import { Route, BrowserRouter, Routes, Navigate, useNavigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Employee from "./pages/employee/Employee";
import New from "./pages/employee/new/New";
import Add from "./pages/user/add/Add";
import Attendance from "./pages/attendance/Attendance";
import Attendancestatus from "./pages/attendanceStatus/AttendanceStatus";
import NewAttendanceStatus from "./pages/attendanceStatus/newAttendanceStatus/NewAttendanceStatus";
import NewJobTitle from "./pages/administrative/newJobTitle/NewJobTitle";
import GeneralStatus from "./pages/generalStatus/GeneralStatus";
import NewStatus from "./pages/generalStatus/newStatus/NewStatus";
import Administrative from "./pages/administrative/Administrative";
import User from "./pages/user/User";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  
  const LoginPage = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
      setLoggedIn(true);
      navigate("/home", { replace: true });
    };

    useEffect(() => {
      const token = localStorage.getItem("auth_token");
      const isLoggedIn = token !== null && token !== "null";

      if (isLoggedIn) {
        setLoggedIn(true);
        navigate("/home", { replace: true });
      }
    }, [navigate]);

    if (loggedIn) {
      return <Navigate to="/home" replace />;
    }
    return <Login onLogin={handleLogin} />;
  };

  const ProtectedRoute = ({ element: Component, ...rest }) => {
    return loggedIn ? (
      <Component {...rest} />
    ) : (
      <Navigate to="/" replace />
    );
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<LoginPage />} />
            <Route path="home" element={<ProtectedRoute element={Home} />} />
            <Route
              path="employee/*"
              element={<ProtectedRoute element={Employee} />}
            />
            <Route path="employee/new" element={<New />} />
            <Route
              path="attendance/*"
              element={<ProtectedRoute element={Attendance} />}
            />
            <Route
              path="attendanceStatus/*"
              element={<ProtectedRoute element={Attendancestatus} />}
            />
            <Route
              path="attendanceStatus/newAttendanceStatus"
              element={<NewAttendanceStatus />}
            />
            <Route
              path="administrative/*"
              element={<ProtectedRoute element={Administrative} />}
            />
            <Route
              path="administrative/newJobTitle"
              element={<NewJobTitle />}
            />
            <Route
              path="generalStatus/*"
              element={<ProtectedRoute element={GeneralStatus} />}
            />
            <Route path="generalStatus/newStatus" element={<NewStatus />} />
            <Route path="user/*" element={<ProtectedRoute element={User} />} />
            <Route path="user/add" element={<Add />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
