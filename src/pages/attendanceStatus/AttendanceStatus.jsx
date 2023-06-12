import "./attendanceStatus.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import TableAttendance from "../../components/tableAttendanceStatus/TableAttendance";
import { Link } from "react-router-dom";

const Attendancestatus = () => {
  return (
    <div className="attendanceStatus">
      <Sidebar />
      <div className="attendance__container">
        <Navbar />
        <div className="attendance__content">
          <div className="content__box">
            <div className="contentBox__form">
              <div className="formAddnew">
                <Link
                  to="/attendanceStatus/newAttendanceStatus"
                  className="link"
                >
                  <button className="button__addnew">Add new</button>
                </Link>
              </div>
            </div>
            <div className="contentBox_table">
              <TableAttendance />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendancestatus;
