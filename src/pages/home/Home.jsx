import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Widget from "../../components/widget/Widget";
import myImage from "../../images/chart.png";
import Chart from "../../components/areaChart/Chart";
import Chart2 from "../../components/funnelChart/Funnel";
import "./home.scss";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />

      <div className="home__container">
        <Navbar />
        <div className="widget__top">
          <div className="items__left">
            <div className="title">
              <span>Assigned Risk</span>
            </div>
            <div className="chart">
              <img className="logo" src={myImage} alt="chart" />
            </div>
          </div>
          <div className="items__right">
            <div className="widget__left">
              <Widget type="active" />
              <Widget type="permission" />
            </div>
            <div className="widget__right">
              <Widget type="attendance" />
              <Widget type="leave" />
            </div>
          </div>
        </div>
        <div className="widget__bottom">
          <div className="widget__left">
            <div className="widget__container">
              <div className="title">
                <span>Most Absent Employee</span>
              </div>
              <Chart2 />
            </div>
          </div>
          <div className="widget__right">
            <div className="widget__container">
              <div className="title">
                <span>Attendance Tren Report</span>
              </div>
              <Chart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
