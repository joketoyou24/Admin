import "./employee.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Table from "../../components/employeeTable/Table";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";

const Employee = () => {
  return (
    <div className="employee">
      <Sidebar />
      <div className="employee__container">
        <Navbar />
        <div className="table__container">
          <div className="button__container">
            <Link to="/employee/new" className="link">
              <div className="new__button">
                <AddIcon />
                <span>Add New</span>
              </div>
            </Link>
          </div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Employee;
