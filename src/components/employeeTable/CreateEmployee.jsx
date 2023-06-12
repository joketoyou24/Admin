import "./createEmployee.scss";
import AddIcon from "@mui/icons-material/Add";
// import ImageTable from "./imageTable/NewTable";
import ErrorMessage from "../LoginForm/ErrorMessage";
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";


const CreateEmployee = () => {
  const [token] = useContext(UserContext);
  const [nik, setNik] = useState("");
  const [gender, setGender] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [job, setJob] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [jobOptions, setJobOptions] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]);
  const [photos, setPhotos] = useState([]); 

  useEffect(() => {
    const getJobOptions = async () => {
      try {
        const requestOptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        };
        const response = await fetch("/job", requestOptions);
        if (!response.ok) {
          setErrorMessage("Something went wrong. Couldn't load the job options");
        }
        const jobData = await response.json();
        setJobOptions(jobData);
      } catch (error) {
        setErrorMessage("Couldn't fetch job options");
      }
    };

    const getStatusOptions = async () => {
      try {
        const requestOptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        };
        const response = await fetch("/status", requestOptions);
        if (!response.ok) {
          setErrorMessage("Something went wrong. Couldn't load the status options");
        }
        const statusData = await response.json();
        setStatusOptions(statusData);
      } catch (error) {
        setErrorMessage("Couldn't fetch status options");
      }
    };

    getJobOptions();
    getStatusOptions();
  }, [token]);

  const cleanFormData = () => {
    setNik("");
    setGender("");
    setName("");
    setStatus("");
    setJob("");
    setPhotos([]); 
  };

  const handleCreate = async () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        name: name,
        NIK: nik,
        gender: gender,
        job_id: job,
        general_status_id: status,
      }),
    };
    const response = await fetch("/employee", requestOptions);
    if (!response.ok) {
      setErrorMessage("Something went wrong when creating employee");
    } else {
      const employeeData = await response.json(); 
  
      const formData = new FormData();
      photos.forEach((photo) => {
        const photoName = `${employeeData.id}.jpg`; 
        formData.append("photos", photo, photoName);
      });
  
      const requestOptionsPhoto = {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
        body: formData,
      };
  
      const photoResponse = await fetch("/employee/upload", requestOptionsPhoto);
      if (!photoResponse.ok) {
        setErrorMessage("Something went wrong when uploading the photos");
      } else {
        navigate("/employee");
        cleanFormData();
      }
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nik.length === 16) {
      handleCreate();
    } else if (nik.length === 0) {
      setErrorMessage("Please fill the NIK field!");
    } else if (name.length === 0) {
      setErrorMessage("Please fill the name field!");
    } else {
      setErrorMessage("Ensure that the NIK is equal to 16 characters");
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setPhotos(files);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="top">
          <div className="input__container">
            <span>NIK</span>
            <input
              className="input"
              type="number"
              id="nik"
              placeholder="NIK..."
              value={nik}
              onChange={(e) => setNik(e.target.value)}
            />
          </div>
          <div className="input__container">
            <span>Gender</span>
            <select
              className="input"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              placeholder="Select gender"
              defaultValue=""
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="Pria">Pria</option>
              <option value="Wanita">Wanita</option>
            </select>
          </div>
        </div>
        <div className="center">
          <div className="input__container">
            <span>Name</span>
            <input
              className="input"
              type="text"
              placeholder="Name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="input__container">
            <label className="label">Job Title</label>
            <select
              className="input"
              value={job}
              onChange={(e) => setJob(e.target.value)}
              placeholder="Select Job"
              defaultValue=""
            >
              <option value="" disabled>
                Select Job
              </option>
              {jobOptions &&
                jobOptions.map((option) => (
                  <option key={option.job_role} value={option.id}>
                    {option.job_role}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="bottom">
          <div className="input__container">
            <label className="label">Status</label>
            <select
              className="input"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              placeholder="Select Status"
              defaultValue=""
            >
              <option value="" disabled>
                Select Status
              </option>
              {statusOptions &&
                statusOptions.map((option) => (
                  <option key={option.status_desc} value={option.id}>
                    {option.status_desc}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="button__container">
          <div className="button__wrapper">
            <label htmlFor="photo">
              <AddIcon className="icon" />
              Add New Photo
            </label>
            <input
              className="btn"
              id="photo"
              type="file"
              accept=".jpg, .jpeg, .png"
              onChange={handleFileChange}
              multiple
            />
          </div>
        </div>
        {/* <div className="table__bottom">
          <div className="table__container">
            <ImageTable />
          </div>
        </div> */}
        <div className="addButton__container">
          <div className="addButton__wrapper">
            <label htmlFor="add">
              <AddIcon className="icon" />
              Add New
            </label>
            <input type="submit" id="add" className="add__btn" />
          </div>
        </div>
        <div className="error__container">
          <div className="error">
            <ErrorMessage message={errorMessage} />
            <br />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateEmployee;
