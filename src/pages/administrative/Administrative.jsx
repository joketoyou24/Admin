import "./administrative.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import TableJobTitle from "../../components/tableJobTitle/TableJobTitle"
import { Link } from "react-router-dom";

const Administrative = () => {
  return (
    <div className="attendanceStatus">
      <Sidebar />
      <div className="attendance__container">
        <Navbar />
        <div className="attendance__content">
          <div className="content__box">
            <div className="contentBox__form">
              <div className="formAddnew">
                <Link to="/administrative/newJobTitle" className="link">
                <button className="button__addnew">Add new</button>
                </Link>
              </div>
            </div>
            <div className="contentBox_table">
             <TableJobTitle />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Administrative;
