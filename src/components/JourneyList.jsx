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

export default function JourneyTable({ journeys, handleEdit, handleDelete }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showCompleted, setShowCompleted] = useState(false);
  // const [statuses, setStatuses] = useState({});
  // const [loadingStatus, setLoadingStatus] = useState(false);

  // useEffect(() => {
  //   fetchAllPnrStatuses();
  // }, [journeys]);

  // const fetchAllPnrStatuses = async () => {
  //   setLoadingStatus(true);
  //   try {
  //     const statusesFetched = {};
  //     for (const journey of journeys) {
  //       const response = await fetchPnrStatus(journey.pnr_number);
  //       statusesFetched[journey.pnr_number] = response;
  //     }
  //     setStatuses(statusesFetched);
  //   } catch (error) {
  //     console.error("Failed to fetch PNR statuses:", error);
  //   } finally {
  //     setLoadingStatus(false);
  //   }
  // };

  // const fetchPnrStatus = async (pnr) => {
  //   try {
  //     const response = await axios.get("http://localhost:8000/status/", {
  //       params: { pnr: pnr },
  //     });
  //     return response.data.PassengerStatus[0].CurrentStatus;
  //   } catch (error) {
  //     console.error(`Failed to fetch status for PNR ${pnr}`, error);
  //     return "Error";
  //   }
  // };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "2-digit" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  const handleSwitchChange = (e) => {
    setShowCompleted(e.target.checked);
  };

  const filteredJourneys = showCompleted
    ? journeys
    : journeys.filter((journey) => journey.journey_status !== "Completed");

  return (
    <Paper sx={{ width: "100%", overflowX: "auto" }}>
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
      <TableContainer>
        <Table size="small" stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell style={{ minWidth: 120 }}>Journey Date</TableCell>
              <TableCell style={{ minWidth: 100 }}>Train Number</TableCell>
              <TableCell style={{ minWidth: 100 }}>PNR Number</TableCell>
              <TableCell style={{ minWidth: 100 }}>Booking Status</TableCell>
              {/* <TableCell style={{ minWidth: 100 }}>Current Status</TableCell> */}
              <TableCell style={{ minWidth: 100 }}>Berth</TableCell>
              <TableCell style={{ minWidth: 100, textAlign: "right" }}>
                Price
              </TableCell>
              <TableCell style={{ minWidth: 150 }}>Payment Mode</TableCell>
              <TableCell style={{ minWidth: 120 }}>Booked Date</TableCell>
              <TableCell style={{ minWidth: 150 }}>Journey Status</TableCell>
              <TableCell style={{ minWidth: 100 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredJourneys
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((journey, index) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  <TableCell>{formatDate(journey.journey_date)}</TableCell>
                  <TableCell>{journey.train_number}</TableCell>
                  <TableCell>
                    <a
                      href={`https://www.confirmtkt.com/pnr-status/${journey.pnr_number}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "inherit", textDecoration: "none" }}
                    >
                      {journey.pnr_number}
                    </a>
                  </TableCell>
                  <TableCell>{journey.status}</TableCell>
                  {/* <TableCell>
                    {loadingStatus ? (
                      <CircularProgress size={20} />
                    ) : (
                      statuses[journey.pnr_number] || "Loading..."
                    )}
                  </TableCell> */}
                  <TableCell>{journey.berth}</TableCell>
                  <TableCell align="right">{journey.price}</TableCell>
                  <TableCell>{journey.payment_mode}</TableCell>
                  <TableCell>{formatDate(journey.booked_date)}</TableCell>
                  <TableCell>{journey.journey_status}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleEdit(index)}
                      aria-label="edit"
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(index)}
                      aria-label="delete"
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
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
