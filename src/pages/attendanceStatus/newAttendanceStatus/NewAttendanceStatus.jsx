import "./newAttendanceStatus.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import CreateAttendanceStatus from "../../../components/tableAttendanceStatus/CreateAttendanceStatus";

const NewAttendanceStatus = () => {
  return (
    <div className="attendanceStatusNew">
      <Sidebar />
      <div className="attendance__container">
        <Navbar />
        <div className="attendance__content">
          <CreateAttendanceStatus />
        </div>
      </div>
    </div>
  );
};

export default NewAttendanceStatus;
