import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon />
        </div>
        <div className="items">
          <div className="item">
            <div className="text">
              <span className="up">Admin</span>
              <span>Regional Operation Center</span>
            </div>
          </div>
          <div className="item">
            <img
              className="avatar"
              src="https://images.pexels.com/photos/845457/pexels-photo-845457.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="man wearing jacket"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
