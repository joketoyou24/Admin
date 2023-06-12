import "./add.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import NewAdmin from "../../../components/userTable/CreateAdmin";

const CRUD = () => {
  return (
    <div className="add">
      <Sidebar />
      <div className="add__container">
        <Navbar />
        <div className="form__container">
          <NewAdmin />
        </div>
      </div>
    </div>
  );
};

export default CRUD;
