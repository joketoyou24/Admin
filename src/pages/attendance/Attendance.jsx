import "./attendance.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Table from "../../components/attendanceTable/AttendanceTable";

const Attendance = () => {
  return (
    <div className="attendance">
      <Sidebar />
      <div className="attendance__container">
        <Navbar />
        <div className="attendance__content">
          <div className="content__box">
            <div className="contentBox_table">
              <Table />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
