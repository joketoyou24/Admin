import "./user.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import AddIcon from "@mui/icons-material/Add";
import Table from "../../components/userTable/Table";
import { Link } from "react-router-dom";

const User = () => {
  return (
    <div className="user">
      <Sidebar />
      <div className="user__container">
        <Navbar />
        <div className="form__container">
          <div className="button__container">
            <Link className="link" to="/user/add">
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

export default User;
