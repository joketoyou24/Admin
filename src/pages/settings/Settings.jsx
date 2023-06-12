import "./settings.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

const Settings = () => {
  return (
    <div className="settings">
      <Sidebar />
      <div className="settings__container">
        <Navbar />
        <div className="settings__content">
          <div className="content__box">
            <div className="input__box">
              <div className="input__row1">
                <div className="input__col1">
                    <span className="toText">App Name</span>
                    <input
                        className="input__box"
                        type="text"
                        placeholder=""
                      />
                </div>
                <div className="input__col2">
                    <span className="toText">Address</span>
                    <input
                        className="input__box"
                        type="text"
                        placeholder=""
                      />
                </div>
              </div>
              <div className="input__row2">
                <div className="input__col1">
                    <span className="toText">Phone</span>
                    <input
                        className="input__box"
                        type="number"
                        placeholder=""
                      />
                </div>
                <div className="input__col2">
                    <span className="toText">Email</span>
                    <input
                        className="input__box"
                        type="text"
                        placeholder=""
                      />
                </div>
              </div>
            </div>
            <div className="shift__box">
              <div className="shiftRow">
                <span className="shiftDes">Shift Pagi</span>
                <div className="absen__shift">
                  <div className="absen">
                    <span className="toText">Absen 1</span>
                    <input
                        className="input__box"
                        type="text"
                        placeholder=""
                      />
                  </div>
                  <div className="absen">
                    <span className="toText">Absen 2</span>
                    <input
                        className="input__box"
                        type="text"
                        placeholder=""
                      />
                  </div>
                  <div className="absen">
                    <span className="toText">Absen 3</span>
                    <input
                        className="input__box"
                        type="text"
                        placeholder=""
                      />
                  </div>
                  <div className="absen">
                    <span className="toText">Absen 4</span>
                    <input
                        className="input__box"
                        type="text"
                        placeholder=""
                      />
                  </div>
                </div>
              </div>
              <div className="shiftRow">
                <span className="shiftDes">Shift Sore</span>
                <div className="absen__shift">
                  <div className="absen">
                    <span className="toText">Absen 1</span>
                    <input
                        className="input__box"
                        type="text"
                        placeholder=""
                      />
                  </div>
                  <div className="absen">
                    <span className="toText">Absen 2</span>
                    <input
                        className="input__box"
                        type="text"
                        placeholder=""
                      />
                  </div>
                  <div className="absen">
                    <span className="toText">Absen 3</span>
                    <input
                        className="input__box"
                        type="text"
                        placeholder=""
                      />
                  </div>
                  <div className="absen">
                    <span className="toText">Absen 4</span>
                    <input
                        className="input__box"
                        type="text"
                        placeholder=""
                      />
                  </div>
                </div>
              </div>
              <div className="shiftRow">
                <span className="shiftDes">Shift Malam</span>
                <div className="absen__shift">
                  <div className="absen">
                    <span className="toText">Absen 1</span>
                    <input
                        className="input__box"
                        type="text"
                        placeholder=""
                      />
                  </div>
                  <div className="absen">
                    <span className="toText">Absen 2</span>
                    <input
                        className="input__box"
                        type="text"
                        placeholder=""
                      />
                  </div>
                  <div className="absen">
                    <span className="toText">Absen 3</span>
                    <input
                        className="input__box"
                        type="text"
                        placeholder=""
                      />
                  </div>
                  <div className="absen">
                    <span className="toText">Absen 4</span>
                    <input
                        className="input__box"
                        type="text"
                        placeholder=""
                      />
                  </div>
                </div>
              </div>
            </div>
            <div className="formUpdate">
                <button className="button__update">Update Changes</button>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Settings;
