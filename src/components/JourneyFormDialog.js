import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Box,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

const JourneyFormDialog = ({
  open,
  onClose,
  onAddJourney,
  trainNames,
  sources,
  destinations,
  paymentModes,
}) => {
  const [newJourney, setNewJourney] = useState({
    type: "",
    trainName: "",
    coach: "",
    berth: "",
    source: "",
    destination: "",
    bookedDate: "",
    bookingStatus: "",
    currentStatus: "",
    paidAmount: "",
    paymentMode: "",
    creditCardBillDate: "",
    journeyStatus: false,
    comments: "",
  });

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
    onAddJourney(newJourney);
    setNewJourney({
      type: "",
      trainName: "",
      coach: "",
      berth: "",
      source: "",
      destination: "",
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
    <Dialog open={open} onClose={onClose}>
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

          {/* Train Name Select */}
          {newJourney.type === "Train" && (
            <FormControl fullWidth margin="normal">
              <InputLabel>Train Name</InputLabel>
              <Select
                name="trainName"
                value={newJourney.trainName}
                onChange={handleSelectChange}
              >
                {trainNames && trainNames.length > 0 ? (
                  trainNames.map((train) => (
                    <MenuItem key={train} value={train}>
                      {train}
                    </MenuItem>
                  ))
                ) : (
                  <p>No options available</p>
                )}
              </Select>
            </FormControl>
          )}

          {/* Source Select */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Source</InputLabel>
            <Select
              name="source"
              value={newJourney.source}
              onChange={handleSelectChange}
            >
              {sources && sources.length > 0 ? (
                sources.map((source) => (
                  <MenuItem key={source} value={source}>
                    {source}
                  </MenuItem>
                ))
              ) : (
                <p>No options available</p>
              )}
            </Select>
          </FormControl>

          {/* Destination Select */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Destination</InputLabel>
            <Select
              name="destination"
              value={newJourney.destination}
              onChange={handleSelectChange}
            >
              {destinations?.map((destination) => (
                <MenuItem key={destination} value={destination}>
                  {destination}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

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

          {/* Payment Mode Select */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Payment Mode</InputLabel>
            <Select
              name="paymentMode"
              value={newJourney.paymentMode}
              onChange={handleSelectChange}
            >
              {paymentModes && paymentModes.length > 0 ? (
                paymentModes.map((mode) => (
                  <MenuItem key={mode} value={mode}>
                    {mode}
                  </MenuItem>
                ))
              ) : (
                <p>No options available</p>
              )}
            </Select>
          </FormControl>

          {/* Credit Card Bill Date */}
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
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleAddJourney}>Add Journey</Button>
      </DialogActions>
    </Dialog>
  );
};

export default JourneyFormDialog;
