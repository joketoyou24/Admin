import "./new.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import CreateEmployee from "../../../components/employeeTable/CreateEmployee";

const New = () => {
  return (
    <div className="new">
      <Sidebar />
      <div className="new__container">
        <Navbar />
        <div className="form__container">
          <CreateEmployee />
        </div>
      </div>
    </div>
  );
};

export default New;
