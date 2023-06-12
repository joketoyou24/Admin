import "./update.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import UpdateAdmin from "../../../components/userTable/UpdateAdmin";

const CRUD = () => {
  return (
    <div className="update">
      <Sidebar />
      <div className="update__container">
        <Navbar />
        <div className="form__container">
          <UpdateAdmin />
        </div>
      </div>
    </div>
  );
};

export default CRUD;
