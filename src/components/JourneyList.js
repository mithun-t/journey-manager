import React, { useState, useEffect } from "react";
import {
  Container,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const JourneyList = () => {
  const [journeys, setJourneys] = useState([]);
  const [open, setOpen] = useState(false);
  const [newJourney, setNewJourney] = useState({
    type: "",
    trainName: "",
    busName: "",
    coach: "",
    berth: "",
    bookedDate: "",
    bookingStatus: "",
    currentStatus: "",
    paidAmount: "",
    paymentMode: "",
    creditCardBillDate: "",
    journeyStatus: false, // Checkbox to mark as completed
    comments: "",
  });

  useEffect(() => {
    const savedJourneys = JSON.parse(localStorage.getItem("journeys")) || [];
    setJourneys(savedJourneys);
  }, []);

  const handleInputChange = (e) => {
    setNewJourney({ ...newJourney, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (event) => {
    const { name, value } = event.target;
    setNewJourney({ ...newJourney, [name]: value });
  };

  const handleCheckboxChange = (event) => {
    setNewJourney({ ...newJourney, journeyStatus: event.target.checked });
  };

  const handleAddJourney = () => {
    const updatedJourneys = [...journeys, newJourney];
    setJourneys(updatedJourneys);
    localStorage.setItem("journeys", JSON.stringify(updatedJourneys));
    handleClose();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewJourney({
      type: "",
      trainName: "",
      busName: "",
      coach: "",
      berth: "",
      bookedDate: "",
      bookingStatus: "",
      currentStatus: "",
      paidAmount: "",
      paymentMode: "",
      creditCardBillDate: "",
      journeyStatus: false,
      comments: "",
    });
  };

  return (
    <Container>
      <h2>Journey Manager</h2>

      {/* List of journeys */}
      <List>
        {journeys.map((journey, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={`Journey Type: ${journey.type}`}
              secondary={
                <>
                  <div>
                    {journey.type === "Train"
                      ? `Train Name: ${journey.trainName}`
                      : `Bus Name: ${journey.busName}`}
                  </div>
                  <div>Coach: {journey.coach}</div>
                  <div>Berth: {journey.berth}</div>
                  <div>Booked Date: {journey.bookedDate}</div>
                  <div>Booking Status: {journey.bookingStatus}</div>
                  <div>Current Status: {journey.currentStatus}</div>
                  <div>Paid Amount: {journey.paidAmount}</div>
                  <div>Payment Mode: {journey.paymentMode}</div>
                  {journey.paymentMode === "Credit Card" && (
                    <div>
                      Credit Card Bill Date: {journey.creditCardBillDate}
                    </div>
                  )}
                  <div>
                    Journey Status:{" "}
                    {journey.journeyStatus ? "Completed" : "Pending"}
                  </div>
                  <div>Comments: {journey.comments}</div>
                </>
              }
            />
          </ListItem>
        ))}
      </List>

      {/* FAB Button to add a new journey */}
      <Fab
        color="primary"
        aria-label="add"
        onClick={handleClickOpen}
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        <AddIcon />
      </Fab>

      {/* Dialog containing the form */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Journey</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2 }}>
            {/* Journey Type Select */}
            <FormControl fullWidth margin="normal">
              <InputLabel>Journey Type</InputLabel>
              <Select
                name="type"
                value={newJourney.type}
                onChange={handleSelectChange}
              >
                <MenuItem value="Train">Train</MenuItem>
                <MenuItem value="Bus">Bus</MenuItem>
              </Select>
            </FormControl>

            {/* Train Name / Bus Name Field */}
            {newJourney.type === "Train" ? (
              <TextField
                label="Train Name"
                name="trainName"
                value={newJourney.trainName}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
            ) : (
              <TextField
                label="Bus Name"
                name="busName"
                value={newJourney.busName}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
            )}

            {/* Coach Select */}
            <FormControl fullWidth margin="normal">
              <InputLabel>Coach</InputLabel>
              <Select
                name="coach"
                value={newJourney.coach}
                onChange={handleSelectChange}
              >
                <MenuItem value="A1">A1</MenuItem>
                <MenuItem value="B2">B2</MenuItem>
                <MenuItem value="C3">C3</MenuItem>
              </Select>
            </FormControl>

            {/* Berth Select */}
            <FormControl fullWidth margin="normal">
              <InputLabel>Berth</InputLabel>
              <Select
                name="berth"
                value={newJourney.berth}
                onChange={handleSelectChange}
              >
                <MenuItem value="Upper">Upper</MenuItem>
                <MenuItem value="Lower">Lower</MenuItem>
                <MenuItem value="Middle">Middle</MenuItem>
              </Select>
            </FormControl>

            {/* Booking Status Select */}
            <FormControl fullWidth margin="normal">
              <InputLabel>Booking Status</InputLabel>
              <Select
                name="bookingStatus"
                value={newJourney.bookingStatus}
                onChange={handleSelectChange}
              >
                <MenuItem value="Confirmed">Confirmed</MenuItem>
                <MenuItem value="Waiting">Waiting</MenuItem>
                <MenuItem value="Cancelled">Cancelled</MenuItem>
              </Select>
            </FormControl>

            {/* Current Status Select */}
            <FormControl fullWidth margin="normal">
              <InputLabel>Current Status</InputLabel>
              <Select
                name="currentStatus"
                value={newJourney.currentStatus}
                onChange={handleSelectChange}
              >
                <MenuItem value="Boarded">Boarded</MenuItem>
                <MenuItem value="Yet to Board">Yet to Board</MenuItem>
                <MenuItem value="Missed">Missed</MenuItem>
              </Select>
            </FormControl>

            {/* Paid Amount */}
            <TextField
              label="Paid Amount"
              name="paidAmount"
              value={newJourney.paidAmount}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />

            {/* Payment Mode */}
            <TextField
              label="Payment Mode"
              name="paymentMode"
              value={newJourney.paymentMode}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            {newJourney.paymentMode === "Credit Card" && (
              <TextField
                label="Credit Card Bill Date"
                name="creditCardBillDate"
                type="date"
                value={newJourney.creditCardBillDate}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}

            {/* Journey Status Checkbox */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={newJourney.journeyStatus}
                  onChange={handleCheckboxChange}
                  name="journeyStatus"
                />
              }
              label="Completed"
            />

            {/* Comments */}
            <TextField
              label="Comments"
              name="comments"
              value={newJourney.comments}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleAddJourney}
            variant="contained"
            color="primary"
          >
            Add Journey
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default JourneyList;
