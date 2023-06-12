import "./generalStatus.scss"
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import TableGeneralStatus from "../../components/tableGeneralStatus/TableGeneralStatus";
import { Link } from "react-router-dom";



const GeneralStatus = () => {
    return (
        <div className="generalStatus">
          <Sidebar />
          <div className="generalStatus__container">
            <Navbar />
            <div className="status__content">
              <div className="content__box">
                <div className="contentBox__form">
                  <div className="formAddnew">
                    <Link to="/generalStatus/newStatus" className="link">
                    <button className="button__addnew">Add new</button>
                    </Link>
                  </div>
                </div>
                <div className="contentBox_table">
                 <TableGeneralStatus />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
}

export default GeneralStatus
