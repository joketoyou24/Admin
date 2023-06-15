import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
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
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/employee/*" element={<Employee />} />
          <Route path="/employee/new" element={<New />} />
          <Route path="/attendance/*" element={<Attendance />} />
          <Route path="/attendanceStatus/*" element={<Attendancestatus />} />
          <Route
            path="/attendanceStatus/newAttendanceStatus"
            element={<NewAttendanceStatus />}
          />
          <Route path="/administrative/*" element={<Administrative />} />
          <Route
            path="/administrative/newJobTitle"
            element={<NewJobTitle />}
          />
          <Route path="/generalStatus/*" element={<GeneralStatus />} />
          <Route path="/generalStatus/newStatus" element={<NewStatus />} />
          <Route path="/user/*" element={<User />} />
          <Route path="/user/add" element={<Add />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
