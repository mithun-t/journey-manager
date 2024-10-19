import React, { useState } from "react";
import JourneyForm from "./JourneyForm";
import {
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import JourneyList from "./JourneyList";

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

  const [isDialogOpen, setIsDialogOpen] = useState(false); // Dialog visibility
  const [isEditing, setIsEditing] = useState(false); // Track whether editing
  const [currentJourneyIndex, setCurrentJourneyIndex] = useState(null); // Track which journey is being edited

  // Open dialog for adding a new journey or editing an existing one
  const toggleDialog = () => {
    setIsDialogOpen((prev) => !prev);
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submit (add or update)
  const handleSubmit = (e) => {
    e.preventDefault();
    let updatedJourneys;

    if (isEditing && currentJourneyIndex !== null) {
      // Update existing journey
      updatedJourneys = [...journeys];
      updatedJourneys[currentJourneyIndex] = formData;
      setIsEditing(false);
      setCurrentJourneyIndex(null);
    } else {
      // Add a new journey
      updatedJourneys = [...journeys, formData];
    }

    setJourneys(updatedJourneys);
    localStorage.setItem("journeys", JSON.stringify(updatedJourneys));
    resetForm();
    toggleDialog();
    alert(
      isEditing
        ? "Journey updated successfully!"
        : "Journey added successfully!"
    );
  };

  // Reset the form
  const resetForm = () => {
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
  };

  // Edit a journey
  const handleEdit = (index) => {
    setFormData(journeys[index]);
    setCurrentJourneyIndex(index);
    setIsEditing(true);
    toggleDialog();
  };

  // Delete a journey
  const handleDelete = (index) => {
    const updatedJourneys = journeys.filter((_, i) => i !== index);
    setJourneys(updatedJourneys);
    localStorage.setItem("journeys", JSON.stringify(updatedJourneys));
    alert("Journey deleted successfully!");
  };

  return (
    <div>
      <h2>Journey List</h2>

      {journeys.length > 0 ? (
        <JourneyList
          journeys={journeys}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      ) : (
        <p>No journeys added yet.</p>
      )}

      {/* Journey Form in Dialog */}
      <Dialog open={isDialogOpen} onClose={toggleDialog}>
        <DialogTitle>{isEditing ? "Edit Journey" : "Add Journey"}</DialogTitle>
        <DialogContent>
          <JourneyForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            submitButtonText={isEditing ? "Update" : "Submit"}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleDialog} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Floating Action Button to open the form */}
      <Fab
        color="primary"
        aria-label="add"
        onClick={() => {
          resetForm(); // Reset form before adding new journey
          setIsEditing(false); // Ensure we are in 'add' mode
          toggleDialog();
        }}
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
