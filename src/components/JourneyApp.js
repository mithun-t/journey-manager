import React, { useState } from "react";
import JourneyForm from "./JourneyForm";
import {
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material"; // Import Dialog components
import AddIcon from "@mui/icons-material/Add";

function JourneyApp() {
  const [formData, setFormData] = useState({
    journey_date: "",
    train_number: "",
    departure_station: "",
    arrival_station: "",
    pnr_number: "",
    status: "",
    berth: "",
    price: "",
    booked_date: "",
    payment_mode: "",
    bill_date: "",
    journey_status_checked: false,
    journey_status: "Pending",
    notes: "",
  });

  const [journeys, setJourneys] = useState(() => {
    const savedJourneys = localStorage.getItem("journeys");
    return savedJourneys ? JSON.parse(savedJourneys) : [];
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to manage dialog visibility

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    console.log(`Name: ${name}, Value: ${value}`); // Log the name and value

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedJourneys = [...journeys, formData];
    localStorage.setItem("journeys", JSON.stringify(updatedJourneys));
    setJourneys(updatedJourneys);
    // Reset form
    setFormData({
      journey_date: "",
      train_number: "",
      departure_station: "",
      arrival_station: "",
      pnr_number: "",
      status: "",
      berth: "",
      price: "",
      booked_date: "",
      payment_mode: "",
      bill_date: "",
      journey_status_checked: false,
      journey_status: "Pending",
      notes: "",
    });
    alert("Journey added successfully!");
    setIsDialogOpen(false); // Close the dialog after submission
  };

  const toggleDialog = () => {
    setIsDialogOpen((prev) => !prev); // Toggle dialog visibility
  };

  return (
    <div>
      <h2>Journey List</h2>
      {journeys.length > 0 ? (
        <ul>
          {journeys.map((journey, index) => (
            <li key={index}>
              <strong>Date:</strong> {journey.journey_date} |{" "}
              <strong>Train:</strong> {journey.train_number} |{" "}
              <strong>PNR:</strong> {journey.pnr_number} |{" "}
              <strong>Status:</strong> {journey.status}
            </li>
          ))}
        </ul>
      ) : (
        <p>No journeys added yet.</p>
      )}

      <Dialog open={isDialogOpen} onClose={toggleDialog}>
        <DialogTitle>Add Journey</DialogTitle>
        <DialogContent>
          <JourneyForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            submitButtonText="Submit"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleDialog} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Fab
        color="primary"
        aria-label="add"
        onClick={toggleDialog} // Handle click to toggle dialog visibility
        style={{
          position: "fixed",
          bottom: "16px",
          right: "16px",
        }}
      >
        <AddIcon />
      </Fab>
    </div>
  );
}

export default JourneyApp;
