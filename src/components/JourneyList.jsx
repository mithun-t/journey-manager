import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import { Tooltip } from "@mui/material";

export default function JourneyTable({ journeys, handleEdit, handleDelete }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showCompleted, setShowCompleted] = useState(false);

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSwitchChange = (e) => setShowCompleted(e.target.checked);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "2-digit" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  const filteredJourneys = showCompleted
    ? journeys
    : journeys.filter((journey) => journey.journeyStatus !== "Completed");

  return (
    <Paper sx={{ width: "100%", overflowX: "auto" }}>
      {/* Switch for filtering */}
      <Grid container justifyContent="flex-end" padding={2}>
        <FormControlLabel
          control={
            <Switch
              checked={showCompleted}
              onChange={handleSwitchChange}
              color="primary"
            />
          }
          label="Show Completed Journeys"
        />
      </Grid>

      {/* Table */}
      <TableContainer>
        <Table size="small" stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Journey Date</TableCell>
              <TableCell>Train Number</TableCell>
              <TableCell>PNR Number</TableCell>
              <TableCell>Booking Status</TableCell>
              <TableCell>Berth</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell>Payment Mode</TableCell>
              <TableCell>Booked Date</TableCell>
              <TableCell>Journey Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredJourneys
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((journey) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={journey.id}>
                  <TableCell>{formatDate(journey.journeyDate)}</TableCell>
                  <TableCell>{journey.trainNumber}</TableCell>
                  <TableCell>{journey.pnrNumber}</TableCell>
                  <TableCell>{journey.status}</TableCell>
                  <TableCell>{journey.berth}</TableCell>
                  <TableCell align="right">{journey.price}</TableCell>
                  <TableCell>{journey.paymentMode}</TableCell>
                  <TableCell>{formatDate(journey.bookedDate)}</TableCell>
                  <TableCell>{journey.journeyStatus}</TableCell>
                  <TableCell>
                    <Tooltip title="Edit">
                      <IconButton
                        onClick={() => handleEdit(journey.id)}
                        aria-label="edit"
                        color="primary"
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        onClick={() => handleDelete(journey.id)}
                        aria-label="delete"
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={filteredJourneys.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
