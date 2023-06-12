import "./table.scss";
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
import UpdateAdmin from "./UpdateAdmin";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const List = () => {
  const [token] = useContext(UserContext);
  const [user, setUser] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [activeModal, setActiveModal] = useState(false);
  const [id, setId] = useState(null);

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
      const response = await fetch(`/admin/${id}`, requestOptions);
      if (!response.ok) {
        setErrorMessage("Failed to delete data");
      }
      getAdmin();
    }
  };

  const getAdmin = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    const response = await fetch("/admin", requestOptions);
    if (!response.ok) {
      setErrorMessage("Something went wrong. Couldn't load the table");
    } else {
      const data = await response.json();
      setUser(data);
      setLoaded(true);
    }
  };

  useEffect(() => {
    getAdmin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleModal = () => {
    setActiveModal(!activeModal);
    getAdmin();
    setId(null);
  };

  const exportToExcel = () => {
    const data = user.map((user) => ({
      ID: user.id,
      Email: user.email,
      Name: user.name,
      "Created At": moment(user.created_date).format("lll"),
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet 1");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const fileName = "data_excel.xlsx";
    const file = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(file, fileName);
  };

  return (
    <>
      <div className="export__container">
        <button onClick={exportToExcel}>Export</button>
      </div>
      <UpdateAdmin
        active={activeModal}
        handleModal={handleModal}
        token={token}
        id={id}
        setErrorMessage={setErrorMessage}
      />
      <ErrorMessage message={errorMessage} />
      {loaded && user ? (
        <TableContainer component={Paper} className="table">
          <Table
            sx={{ minWidth: 650 }}
            aria-label="simple table"
            id="dataTable"
          >
            <TableHead>
              <TableRow>
                <TableCell className="tableHead">ID</TableCell>
                <TableCell className="tableHead">Email</TableCell>
                <TableCell className="tableHead">Name</TableCell>
                <TableCell className="tableHead">Created At</TableCell>
                <TableCell className="tableHead">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {user.map((user, index) => (
                <TableRow
                  key={user.id}
                  className={index % 2 === 0 ? "even" : "odd"}
                >
                  <TableCell className="tableCell">{user.id}</TableCell>
                  <TableCell className="tableCell">{user.email}</TableCell>
                  <TableCell className="tableCell">{user.name}</TableCell>
                  <TableCell className="tableCell">
                    {moment(user.created_date).format("lll")}
                  </TableCell>
                  <TableCell className="tableCell__action">
                    <EditOutlinedIcon
                      className="edit"
                      onClick={() => handleUpdate(user.id)}
                    />
                    <DeleteOutlineOutlinedIcon
                      className="delete"
                      onClick={() => handleDelete(user.id)}
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
