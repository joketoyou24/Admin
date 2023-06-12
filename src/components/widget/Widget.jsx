import { useEffect, useState, useContext } from "react";
import "./widget.scss";
import { UserContext } from "../../context/userContext";

const Widget = ({ type }) => {
  const [activeEmployeeCount, setActiveEmployeeCount] = useState(0);
  const [token] = useContext(UserContext);
  const [permissionCount, setPermissionCount] = useState(0);
  const [attendanceCount, setAttendanceCount] = useState(0);
  const [leaveCount, setLeaveCount] = useState(0);

  useEffect(() => {
    const fetchActiveEmployeeCount = async () => {
      try {
        const requestOptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        };

        const response = await fetch("/employee", requestOptions);
        if (!response.ok) {
          throw new Error(
            "Something went wrong. Couldn't load the employee data"
          );
        }

        const employeeData = await response.json();
        const activeEmployees = employeeData.filter(
          (employee) => employee.status.status_desc === 'Active'
        );

        setActiveEmployeeCount(activeEmployees.length);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchPermissionCount = async () => {
      try {
        const requestOptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        };

        const response = await fetch("/attendance", requestOptions);
        if (!response.ok) {
          throw new Error(
            "Something went wrong. Couldn't load the attendance data"
          );
        }

        const attendanceData = await response.json();
        const permissionToday = attendanceData.filter(
          (attendance) => attendance.attendance[0].attendance_status.status_desc === 'Izin'
        );
        
        setPermissionCount(permissionToday.length);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchAttendanceCount = async () => {
      try {
        const requestOptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        };

        const response = await fetch("/attendance", requestOptions);
        if (!response.ok) {
          throw new Error(
            "Something went wrong. Couldn't load the attendance data"
          );
        }

        const attendanceData = await response.json();
        const attendanceToday = attendanceData.filter(
          (attendance) => attendance.attendance[0].attendance_status.status_desc === 'Hadir'
        );
        
        setAttendanceCount(attendanceToday.length);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchLeaveCount = async () => {
      try {
        const requestOptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        };

        const response = await fetch("/attendance", requestOptions);
        if (!response.ok) {
          throw new Error(
            "Something went wrong. Couldn't load the attendance data"
          );
        }

        const attendanceData = await response.json();
        const leaveToday = attendanceData.filter(
          (attendance) => attendance.attendance[0].attendance_status.status_desc === 'Cuti'
        );
        
        setLeaveCount(leaveToday.length);
      } catch (error) {
        console.error(error);
      }
    };

    fetchActiveEmployeeCount();
    fetchPermissionCount();
    fetchAttendanceCount();
    fetchLeaveCount();
  }, [token]);

  let data;

  switch (type) {
    case "active":
      data = {
        title: "Total Karyawan Aktif",
        counter: activeEmployeeCount,
      };
      break;
    case "permission":
      data = {
        title: "Izin Hari Ini",
        counter: permissionCount,
      };
      break;
    case "attendance":
      data = {
        title: "Kehadiran Hari Ini",
        counter: attendanceCount,
      };
      break;
    case "leave":
      data = {
        title: "Cuti Hari Ini",
        counter: leaveCount,
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="top">
        <span className="title">{data.title}</span>
      </div>
      <div className="bottom">
        <span className="counter">{data.counter}</span>
      </div>
    </div>
  );
};

export default Widget;
