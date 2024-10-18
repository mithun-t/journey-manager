import React, { useState, useEffect } from "react";
import JourneyForm from "./JourneyForm";

function JourneyApp() {
  const [formData, setFormData] = useState({
    journey_date: "",
    train_number: "",
    departure_station: "",
    arrival_station: "",
    pnr_number: "",
    status: "", // This should match the structure of the dropdown value
    berth: "",
    price: "",
    booked_date: "",
    payment_mode: "",
    bill_date: "",
    journey_status_checked: false,
    journey_status: "Pending", // default status
    notes: "",
  });

  // State to store all journeys
  const [journeys, setJourneys] = useState(() => {
    const savedJourneys = localStorage.getItem("journeys");
    return savedJourneys ? JSON.parse(savedJourneys) : [];
  });

  // Handle change in form input fields
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let parsedValue = value;

    // If value is a JSON string (for dropdowns), parse it to get both code and name
    if (
      name === "train_number" ||
      name === "departure_station" ||
      name === "arrival_station" ||
      name === "status" ||
      name === "berth" ||
      name === "payment_mode"
    ) {
      parsedValue = JSON.parse(value);
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : parsedValue, // Store the full object (code and name)
    }));
  };

  // Handle form submission - save data to localStorage
  const handleSubmit = (e) => {
    e.preventDefault();

    // Add the new journey to the journeys array
    const updatedJourneys = [
      ...journeys,
      {
        ...formData,
        status: formData.status, // This should already be an object with code and name
      },
    ];

    // Save to localStorage
    localStorage.setItem("journeys", JSON.stringify(updatedJourneys));

    // Update state
    setJourneys(updatedJourneys);

    // Clear the form after submission
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
  };

  // Clear all journeys from localStorage
  const handleClearForm = () => {
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

  return (
    <div>
      <h2>Journey Form</h2>
      <JourneyForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleClearForm={handleClearForm}
        submitButtonText="Submit"
      />

      <h2>Journey List</h2>
      {journeys.length > 0 ? (
        <ul>
          {journeys.map((journey, index) => (
            <li key={index}>
              <strong>Date:</strong> {journey.journey_date} |{" "}
              <strong>Train:</strong> {journey.train_number?.name} (Code:{" "}
              {journey.train_number?.code}) | <strong>PNR:</strong>{" "}
              {journey.pnr_number} | <strong>Status:</strong>{" "}
              {journey.status?.name} (Code: {journey.status?.code})
            </li>
          ))}
        </ul>
      ) : (
        <p>No journeys added yet.</p>
      )}
    </div>
  );
}

export default JourneyApp;
