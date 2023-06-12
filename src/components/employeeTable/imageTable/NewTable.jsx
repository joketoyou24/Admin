import "./newTable.scss";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";


const NewTable = () => {
  const rows = [
    {
      id: 1,
      face: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Dwayne_Johnson_Hercules_2014_%28cropped%29.jpg",
      date: "03/13/2023 11:02",
    },
  ];

  return (
    <TableContainer component={Paper} className="face__table">
      <Table sx={{ minWidth: 1100 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableHead__id">ID</TableCell>
            <TableCell className="tableHead">Face</TableCell>
            <TableCell className="tableHead">Created At</TableCell>
            <TableCell className="tableHead__action">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">{row.id}</TableCell>
              <TableCell className="tableCell">
                <div className="cell__wrapper">
                  <img src={row.face} alt="" className="face" />
                </div>
              </TableCell>
              <TableCell className="tableCell">{row.date}</TableCell>
              <TableCell className="tableCell">
                <input type="button" value="Delete" className="btn"/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default NewTable;
