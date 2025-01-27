import React, { useEffect, useState } from "react";
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
import axios from "axios";

function JourneyApp() {
  const [formData, setFormData] = useState({
    journeyDate: "",
    trainNumber: "",
    departureStation: "",
    arrivalStation: "",
    pnrNumber: "",
    status: "",
    berth: "",
    price: "",
    bookedDate: "",
    paymentMode: "",
    journeyStatusChecked: false,
    journeyStatus: "Pending",
    notes: "",
  });

  const [journeys, setJourneys] = useState([]);
  const GetJourneys = async () => {
    const response = await axios.get("http://localhost:5283/api/Journey");
    const journeys = response.data;
    const sortedJourneys = journeys
      ? journeys.sort((a, b) => a.journeyDate.localeCompare(b.journeyDate))
      : [];
    setJourneys(sortedJourneys);
  };
  useEffect(() => {
    GetJourneys();
  }, []);
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
    console.log("value", value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    formData.journeyDate = new Date(formData.journeyDate).toISOString();
    formData.bookedDate = new Date(formData.bookedDate).toISOString();
    formData.price = parseFloat(formData.price);
    formData.journeyStatusChecked = formData.journeyStatusChecked || false;

    if (currentJourneyId) {
      const updateJourney = async () => {
        const response = await axios.put(
          `http://localhost:5283/api/Journey/${currentJourneyId}`,
          formData
        );
        console.log(response);
      };
      updateJourney();
    } else {
      const saveJourney = async () => {
        await axios.post("http://localhost:5283/api/Journey", formData);
      };
      saveJourney();
    }

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
      journeyDate: "",
      trainNumber: "",
      departureStation: "",
      arrivalStation: "",
      pnrNumber: "",
      status: "",
      berth: "",
      price: "",
      bookedDate: "",
      paymentMode: "",
      journeyStatusChecked: false,
      journeyStatus: "Pending",
      notes: "",
    });
  };

  const handleEdit = (id) => {
    const journeyToEdit = journeys.find((journey) => journey.id === id);
    if (journeyToEdit) {
      setFormData(journeyToEdit);
      setCurrentJourneyId(id);
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
