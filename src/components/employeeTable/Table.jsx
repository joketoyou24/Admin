import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import { useEffect, useState, useContext } from "react";
import ErrorMessage from "../LoginForm/ErrorMessage";
import { UserContext } from "../../context/userContext";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import UpdateEmployee from "./UpdateEmployee";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import "./table.scss";

const List = () => {
  const [token] = useContext(UserContext);
  const [employees, setEmployees] = useState([]);
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
      const response = await fetch(`/employee/${id}`, requestOptions);
      if (!response.ok) {
        setErrorMessage("Failed to delete data");
      }
      getEmployees();
    }
  };

  const getEmployees = async () => {
    try {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const response = await fetch("/employee", requestOptions);
      if (!response.ok) {
        setErrorMessage("Something went wrong. Couldn't load the information");
      }
      const employeesData = await response.json();

      const statusResponse = await fetch("/status", requestOptions);
      if (!statusResponse.ok) {
        throw new Error(
          "Something went wrong. Couldn't load the status information"
        );
      }
      const statusData = await statusResponse.json();

      const jobResponse = await fetch("/job", requestOptions);
      if (!statusResponse.ok) {
        throw new Error(
          "Something went wrong. Couldn't load the job information"
        );
      }

      const jobData = await jobResponse.json();

      const employees_status_job = employeesData.map((employee) => {
        const status = employee.status;
        const job = employee.job;

        return { ...employee, status, job };
      });
      setEmployees(employees_status_job);
      setLoaded(true);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    getEmployees();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleModal = () => {
    setActiveModal(!activeModal);
    getEmployees();
    setId(null);
  };

  const exportToExcel = () => {
    const data = employees.map((employee) => ({
      ID: employee.id,
      NIK: employee.NIK.toString(),
      Name: employee.name,
      Gender: employee.gender,
      Job: employee.job.job_role,
      Status: employee.status.status_desc,
      "Created At": moment(employee.created_date).format("lll"),
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet 1");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const fileName = "data_pegawai.xlsx";
    const file = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(file, fileName);
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
      headerClassName: "header-cell",
    },
    {
      field: "NIK",
      headerName: "NIK",
      width: 220,
      headerClassName: "header-cell",
    },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      headerClassName: "header-cell",
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 150,
      headerClassName: "header-cell",
    },
    {
      field: "job_role",
      headerName: "Job Title",
      width: 160,
      headerClassName: "header-cell",
    },
    {
      field: "status_desc",
      headerName: "Status",
      width: 150,
      headerClassName: "header-cell",
    },
    {
      field: "created_date",
      headerName: "Created At",
      width: 220,
      headerClassName: "header-cell",
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      headerClassName: "header-cell",
      renderCell: (params) => (
        <>
          <EditOutlinedIcon
            className="edit"
            onClick={() => handleUpdate(params.row.id)}
          />
          <DeleteOutlineOutlinedIcon
            className="delete"
            onClick={() => handleDelete(params.row.id)}
          />
        </>
      ),
    },
  ];

  const rows = employees.map((employee, index) => ({
    id: employee.id,
    NIK: employee.NIK,
    name: employee.name,
    gender: employee.gender,
    job_role: employee.job.job_role,
    status_desc: employee.status.status_desc,
    created_date: moment(employee.created_date).format("lll"),
  }));

  return (
    <>
      <div className="export__container">
        <button onClick={exportToExcel}>Export</button>
      </div>
      <UpdateEmployee
        active={activeModal}
        handleModal={handleModal}
        token={token}
        id={id}
        setErrorMessage={setErrorMessage}
      />
      <ErrorMessage message={errorMessage} />
      {loaded && employees ? (
        <div className="table" style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
          />
        </div>
      ) : (
        <p>loading</p>
      )}
    </>
  );
};

export default List;
