import React, { useState } from "react";
import axios from "axios";
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
import {
  Tooltip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
} from "@mui/material";

export default function JourneyTable({ journeys, handleEdit, handleDelete }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showCompleted, setShowCompleted] = useState(false);
  const [pnrData, setPnrData] = useState(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const fetchPnrStatus = async (pnrNumber) => {
    const options = {
      method: "GET",
      url: `https://irctc-indian-railway-pnr-status.p.rapidapi.com/getPNRStatus/${pnrNumber}`,
      headers: {
        "x-rapidapi-key": "8b3794ddb1msh97fb1a307bd5b83p1c2625jsn58f5c00c04d3",
        "x-rapidapi-host": "irctc-indian-railway-pnr-status.p.rapidapi.com",
      },
    };

    try {
      setLoading(true);
      const response = await axios.request(options);
      console.log(response);
      setPnrData(response.data);
      setDialogOpen(true);
    } catch (error) {
      console.error("Error fetching PNR status:", error);
      alert("Failed to fetch PNR Status. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const filteredJourneys = showCompleted
    ? journeys
    : journeys.filter((journey) => journey.journey_status !== "Completed");

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
              <TableCell>PNR Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredJourneys
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((journey) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={journey.id}>
                  <TableCell>{formatDate(journey.journey_date)}</TableCell>
                  <TableCell>{journey.train_number}</TableCell>
                  <TableCell>{journey.pnr_number}</TableCell>
                  <TableCell>{journey.status}</TableCell>
                  <TableCell>{journey.berth}</TableCell>
                  <TableCell align="right">{journey.price}</TableCell>
                  <TableCell>{journey.payment_mode}</TableCell>
                  <TableCell>{formatDate(journey.booked_date)}</TableCell>
                  <TableCell>{journey.journey_status}</TableCell>
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
                  <TableCell>
                    <Button
                      variant="outlined"
                      size="small"
                      color="secondary"
                      onClick={() => fetchPnrStatus(journey.pnr_number)}
                      disabled={loading}
                    >
                      {loading ? "Loading..." : "Check"}
                    </Button>
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

      {/* PNR Status Dialog */}
      <Dialog open={isDialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>PNR Status Details</DialogTitle>
        <DialogContent>
          {pnrData ? (
            <Typography>
              <strong>Train Name:</strong> {pnrData.data.trainName} <br />
              <strong>Train Number:</strong> {pnrData.data.trainNumber} <br />
              <strong>Date of Journey:</strong> {pnrData.data.dateOfJourney}{" "}
              <br />
              <strong>Chart Status:</strong> {pnrData.data.chartStatus} <br />
              <strong>Passenger Status:</strong>{" "}
              {pnrData.data.passengerList[0]?.currentStatusDetails} <br />
              <strong>Booking Fare:</strong> ₹{pnrData.data.bookingFare}
            </Typography>
          ) : (
            <Typography>Unable to fetch PNR details.</Typography>
          )}
        </DialogContent>
      </Dialog>
    </Paper>
  );
}
