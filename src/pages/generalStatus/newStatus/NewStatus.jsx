import "./newStatus.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import CreateGeneralStatus from "../../../components/tableGeneralStatus/CreateGeneralStatus";

const NewStatus = () => {
  return (
    <div className="newStatus">
      <Sidebar />
      <div className="status__container">
        <Navbar />
        <div className="status__content">
          <CreateGeneralStatus />
        </div>
      </div>
    </div>
  );
};

export default NewStatus;
