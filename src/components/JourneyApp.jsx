import React, { useState } from "react";
import JourneyForm from "./JourneyForm";
import {
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import JourneyList from "./JourneyList";

let nextId = 1; // Initialize a counter for unique IDs

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
    return savedJourneys
      ? JSON.parse(savedJourneys).sort((a, b) =>
          a.journey_date.localeCompare(b.journey_date)
        )
      : [];
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentJourneyId, setCurrentJourneyId] = useState(null); // Change from index to id

  const toggleDialog = () => {
    setIsDialogOpen((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let updatedJourneys;

    if (isEditing && currentJourneyId !== null) {
      updatedJourneys = journeys.map((journey) =>
        journey.id === currentJourneyId ? { ...journey, ...formData } : journey
      );
      setIsEditing(false);
      setCurrentJourneyId(null);
    } else {
      const newJourney = { id: nextId++, ...formData }; // Assign unique id
      updatedJourneys = [...journeys, newJourney];
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

  const handleEdit = (id) => {
    const journeyToEdit = journeys.find((journey) => journey.id === id);
    if (journeyToEdit) {
      setFormData(journeyToEdit);
      setCurrentJourneyId(id); // store the current journey id
      setIsEditing(true);
      toggleDialog();
    }
  };

  const handleDelete = (id) => {
    const updatedJourneys = journeys.filter((journey) => journey.id !== id);
    setJourneys(updatedJourneys);
    localStorage.setItem("journeys", JSON.stringify(updatedJourneys));
    alert("Journey deleted successfully!");
  };

  return (
    <div>
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
          resetForm();
          setIsEditing(false);
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
