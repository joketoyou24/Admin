import "./newJobTitle.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import CreateJob from "../../../components/tableJobTitle/CreateJob";

const NewJobTitle = () => {
  return (
    <div className="NewJobTitle">
      <Sidebar />
      <div className="attendance__container">
        <Navbar />
        <div className="attendance__content">
          <CreateJob />
        </div>
      </div>
    </div>
  );
};

export default NewJobTitle;
