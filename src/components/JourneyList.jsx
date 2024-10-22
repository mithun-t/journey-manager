import * as React from "react";
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

export default function JourneyTable({ journeys, handleEdit, handleDelete }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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

  return (
    <Paper sx={{ width: "100%", overflowX: "auto" }}>
      <TableContainer>
        <Table size="small" stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell style={{ minWidth: 120 }}>Journey Date</TableCell>
              <TableCell style={{ minWidth: 100 }}>Train Number</TableCell>
              <TableCell style={{ minWidth: 100 }}>PNR Number</TableCell>
              <TableCell style={{ minWidth: 100 }}>Status</TableCell>
              <TableCell style={{ minWidth: 100 }}>Berth</TableCell>
              <TableCell style={{ minWidth: 100, textAlign: "right" }}>
                Price
              </TableCell>
              <TableCell style={{ minWidth: 150 }}>Payment Mode</TableCell>
              <TableCell style={{ minWidth: 150 }}>Journey Status</TableCell>
              <TableCell style={{ minWidth: 100 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {journeys
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
                  <TableCell>{journey.berth}</TableCell>
                  <TableCell align="right">{journey.price}</TableCell>
                  <TableCell>{journey.payment_mode}</TableCell>
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
        count={journeys.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
