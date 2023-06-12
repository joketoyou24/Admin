import "./table.scss";
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
import moment from "moment";
import UpdateAttendanceStatus from "./UpdateAttendanceStatus";

const List = () => {
  const [token] = useContext(UserContext);
  const [status, setStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [activeModal, setActiveModal] = useState(false);
  const [id, setId] = useState(null);

  const handleUpdate = async (id) => {
    setId(id);
    setActiveModal(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this data?");
    if (confirmDelete) {
      const requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const response = await fetch(`/attendance_status/${id}`, requestOptions);
      if (!response.ok) {
        setErrorMessage("Failed to delete data");
      }
      getStatus();
    }
  };

  const getStatus = async () => {
    try {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const response = await fetch("/attendance_status", requestOptions);
      if (!response.ok) {
        setErrorMessage("Something went wrong. Couldn't load the leads");
      }
      const statusData = await response.json();
      setStatus(statusData);
      setLoaded(true);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    getStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleModal = () => {
    setActiveModal(!activeModal);
    getStatus();
    setId(null);
  };

  return (
    <>
      <UpdateAttendanceStatus
        active={activeModal}
        handleModal={handleModal}
        token={token}
        id={id}
        setErrorMessage={setErrorMessage}
      />
      <ErrorMessage message={errorMessage} />
      {loaded && status ? (
        <TableContainer component={Paper} className="table">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="tableHead">ID</TableCell>
                <TableCell className="tableHead">Status</TableCell>
                <TableCell className="tableHead">Created At</TableCell>
                <TableCell className="tableHead">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {status.map((status, index) => (
                <TableRow
                  key={status.id}
                  className={index % 2 === 0 ? "even" : "odd"}
                >
                  <TableCell className="tableCell">{status.id}</TableCell>
                  <TableCell className="tableCell">
                    {status.status_desc}
                  </TableCell>
                  <TableCell className="tableCell">
                    {moment(status.created_date).format("lll")}
                  </TableCell>
                  <TableCell className="tableCell__action">
                    <EditOutlinedIcon
                      className="edit"
                      onClick={() => handleUpdate(status.id)}
                    />
                    <DeleteOutlineOutlinedIcon
                      className="delete"
                      onClick={() => handleDelete(status.id)}
                    />
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
