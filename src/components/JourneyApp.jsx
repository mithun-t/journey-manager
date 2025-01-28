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
  const BASE_URL = "http://localhost:5283/api/Journey";
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
    const response = await axios.get(BASE_URL);
    const journeys = response.data;
    const sortedJourneys = journeys
      ? journeys.sort((a, b) => a.journeyDate.localeCompare(b.journeyDate))
      : [];
    setJourneys(sortedJourneys);
  };
  const GetJourneyByID = async (id) => {
    const response = await axios.get(`${BASE_URL}/${id}`);
    const journey = response.data;
    return journey;
  };
  useEffect(() => {
    GetJourneys();
  }, []);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentJourneyId, setCurrentJourneyId] = useState(null);

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
    try {
      formData.journeyDate = new Date(formData.journeyDate).toISOString();
    } catch (error) {
      formData.journeyDate = new Date().toISOString();
    }
    try {
      formData.bookedDate = new Date(formData.bookedDate).toISOString();
    } catch (error) {
      formData.bookedDate = new Date().toISOString();
    }

    formData.price = parseFloat(formData.price);
    formData.journeyStatusChecked = formData.journeyStatusChecked || false;

    if (currentJourneyId) {
      const updateJourney = async () => {
        await axios.put(`${BASE_URL}/${currentJourneyId}`, formData);
      };
      updateJourney();
    } else {
      const saveJourney = async () => {
        await axios.post(BASE_URL, formData);
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
    GetJourneys();
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

  const handleEdit = async (id) => {
    let journeyToEdit = await GetJourneyByID(id);
    journeyToEdit.bookedDate = journeyToEdit.bookedDate.substring(0, 10);
    journeyToEdit.journeyDate = journeyToEdit.journeyDate.substring(0, 10);
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
    const deleteJourney = async () => {
      await axios.delete(`${BASE_URL}/${id}`);
    };
    deleteJourney();
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
