import "./attendanceTable.scss";
import moment from "moment";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useEffect, useState, useContext } from "react";
import ErrorMessage from "../LoginForm/ErrorMessage";
import { UserContext } from "../../context/userContext";
import UpdateAttendance from "./UpdateAttendance";
import * as XLSX from "xlsx";

const List = () => {
  const [token] = useContext(UserContext);
  const [attendances, setAttendances] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [activeModal, setActiveModal] = useState(false);
  const [id, setId] = useState(null);
  const [filterDate, setFilterDate] = useState("");
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");

  const handleUpdate = async (id) => {
    setId(id);
    setActiveModal(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this data?"
    );
    if (confirmDelete) {
      const requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const response = await fetch(`/attendance/${id}`, requestOptions);
      if (!response.ok) {
        setErrorMessage("Failed to delete data");
      }
      getAttendances();
    }
  };

  const exportToExcel = () => {
    const attendanceData = attendances.map((item) => {
      return {
        ID: item.employee.id,
        NIK: item.employee.NIK.toString(),
        Name: item.employee.name,
        "Absen 1": item.attendance[0]?.absen_1
          ? moment(item.attendance[0]?.absen_1).format("HH:mm:ss")
          : "-",
        "Absen 2": item.attendance[0]?.absen_2
          ? moment(item.attendance[0]?.absen_2).format("HH:mm:ss")
          : "-",
        "Absen 3": item.attendance[0]?.absen_3
          ? moment(item.attendance[0]?.absen_3).format("HH:mm:ss")
          : "-",
        "Absen 4": item.attendance[0]?.absen_4
          ? moment(item.attendance[0]?.absen_4).format("HH:mm:ss")
          : "-",
        Date: item.attendance[0]?.date,
        Status: item.attendance[0]?.attendance_status
          ? item.attendance[0]?.attendance_status.status_desc
          : "-",
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(attendanceData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Kehadiran");
    XLSX.writeFile(workbook, "kehadiran.xlsx");
  };

  const getAttendances = async () => {
    try {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const response = await fetch("/attendance", requestOptions);
      if (!response.ok) {
        setErrorMessage("Something went wrong. Couldn't load the table");
      }
      const attendanceData = await response.json();

      const attendancestatusResponse = await fetch(
        "/attendance_status",
        requestOptions
      );
      if (!attendancestatusResponse.ok) {
        throw new Error("Something went wrong. Couldn't load table");
      }

      const attendance_status = attendanceData.map((attendance) => {
        const attendancestatus = attendance.attendance.attendance_status;

        return { ...attendance, attendancestatus };
      });

      setAttendances(attendance_status);
      setLoaded(true);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleFilter = async () => {
    if (filterDate) {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const url = `/attendance?date=${filterDate}`;
      try {
        const response = await fetch(url, requestOptions);
        if (!response.ok) {
          setErrorMessage("Something went wrong. Couldn't load the table");
        }
        const attendanceData = await response.json();

        const attendance_status = attendanceData.map((attendance) => {
          const attendancestatus = attendance.attendance.attendance_status;

          return { ...attendance, attendancestatus };
        });

        setAttendances(attendance_status);
        setLoaded(true);
      } catch (error) {
        setErrorMessage(error.message);
      }
    } else {
      // Jika filterDate kosong, panggil getAttendances untuk mendapatkan semua data
      getAttendances();
    }
  };

  const handleSubmit = async () => {
    if (selectedEmployeeId) {
      try {
        const requestOptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        };
        const url = `/attendance?employee_id=${selectedEmployeeId}`;
        const response = await fetch(url, requestOptions);
        if (!response.ok) {
          throw new Error("Something went wrong. Couldn't load the table");
        }
        const attendanceData = await response.json();

        const attendance_status = attendanceData.map((attendance) => {
          const attendancestatus = attendance.attendance.attendance_status;

          return { ...attendance, attendancestatus };
        });

        setAttendances(attendance_status);
        setLoaded(true);
      } catch (error) {
        setErrorMessage(error.message);
      }
    } else {
      // If no employee is selected, fetch all attendances
      getAttendances();
    }
  };

  useEffect(() => {
    getAttendances();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleModal = () => {
    setActiveModal(!activeModal);
    getAttendances();
    setId(null);
  };

  return (
    <>
      <UpdateAttendance
        active={activeModal}
        handleModal={handleModal}
        token={token}
        id={id}
        setErrorMessage={setErrorMessage}
      />
      <ErrorMessage message={errorMessage} />
      <div className="contentBox__form">
        <div className="formSort">
          <input
            type="date"
            placeholder="MM/DD/YYYY"
            value={filterDate}
            className="input__box"
            onChange={(e) => setFilterDate(e.target.value)}
          />
          <button className="filterBtn" onClick={handleFilter}>
            Filter
          </button>
        </div>
        <div className="formSubmit">
          <div className="selectEmployee">
            <select
              className="dropdown__employee"
              name="dropdown__employee"
              value={selectedEmployeeId}
              onChange={(e) => setSelectedEmployeeId(e.target.value)}
            >
              <option value="" disabled>
                Select Employee
              </option>
              {attendances.map((attendance) => (
                <option
                  key={attendance.employee.id}
                  value={attendance.employee.id}
                >
                  {attendance.employee.name}
                </option>
              ))}
            </select>
          </div>
          <div className="buttonSubmit">
            <button className="button__submit" onClick={handleSubmit}>
              Submit
            </button>
          </div>
          <div className="buttonReports">
            <button onClick={exportToExcel} className="button__reports">
              Reports
            </button>
          </div>
        </div>
      </div>
      {loaded && attendances ? (
        <TableContainer component={Paper} className="table">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="tableHead">ID</TableCell>
                <TableCell className="tableHead">NIK</TableCell>
                <TableCell className="tableHead">Name</TableCell>
                <TableCell className="tableHead">Absen 1</TableCell>
                <TableCell className="tableHead">Absen 2</TableCell>
                <TableCell className="tableHead">Absen 3</TableCell>
                <TableCell className="tableHead">Absen 4</TableCell>
                <TableCell className="tableHead">Date</TableCell>
                <TableCell className="tableHead">Status</TableCell>
                <TableCell className="tableHead">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {attendances.map((item, index) => (
                <TableRow
                  key={item.employee.id}
                  className={index % 2 === 0 ? "even" : "odd"}
                >
                  <TableCell className="tableCell">
                    {item.employee.id}
                  </TableCell>
                  <TableCell item="tableCell">{item.employee.NIK}</TableCell>
                  <TableCell className="tableCell">
                    {item.employee.name}
                  </TableCell>
                  <TableCell className="tableCell">
                    {item.attendance.map((attendanceItem) => (
                      <div key={attendanceItem.id}>
                        {attendanceItem.absen_1
                          ? moment(attendanceItem.absen_1).format("HH:mm:ss")
                          : "-"}
                      </div>
                    ))}
                  </TableCell>
                  <TableCell className="tableCell">
                    {item.attendance.map((attendanceItem) => (
                      <div key={attendanceItem.id}>
                        {attendanceItem.absen_2
                          ? moment(attendanceItem.absen_2).format("HH:mm:ss")
                          : "-"}
                      </div>
                    ))}
                  </TableCell>
                  <TableCell className="tableCell">
                    {item.attendance.map((attendanceItem) => (
                      <div key={attendanceItem.id}>
                        {attendanceItem.absen_3
                          ? moment(attendanceItem.absen_3).format("HH:mm:ss")
                          : "-"}
                      </div>
                    ))}
                  </TableCell>
                  <TableCell className="tableCell">
                    {item.attendance.map((attendanceItem) => (
                      <div key={attendanceItem.id}>
                        {attendanceItem.absen_4
                          ? moment(attendanceItem.absen_4).format("HH:mm:ss")
                          : "-"}
                      </div>
                    ))}
                  </TableCell>
                  <TableCell className="tableCell">
                    {item.attendance.map((attendanceItem) => (
                      <div key={attendanceItem.id}>{attendanceItem.date}</div>
                    ))}
                  </TableCell>
                  <TableCell className="tableCell">
                    {item.attendance.map((attendanceItem) => (
                      <div key={attendanceItem.id}>
                        {attendanceItem.attendance_status
                          ? attendanceItem.attendance_status.status_desc
                          : "-"}
                      </div>
                    ))}
                  </TableCell>
                  <TableCell className="tableCell__action">
                    {item.attendance.map((attendanceItem) => (
                      <div key={attendanceItem.id}>
                        <EditOutlinedIcon
                          className="edit"
                          onClick={() => handleUpdate(attendanceItem.id)}
                        />
                        <DeleteOutlineOutlinedIcon
                          className="delete"
                          onClick={() => handleDelete(attendanceItem.id)}
                        />
                      </div>
                    ))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <p>loading</p>
      )}
    </>
  );
};

export default List;
