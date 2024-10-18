import React, { useState, useEffect } from "react";
import JourneyForm from "./JourneyForm";

function JourneyApp() {
  const [formData, setFormData] = useState({
    journey_date: "",
    train_number: "", // Make sure this is set to an empty string initially
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    console.log(`Name: ${name}, Value: ${value}`); // Log the name and value

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value, // Use value directly
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
  };

  return (
    <div>
      <h2>Journey Form</h2>
      <JourneyForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        submitButtonText="Submit"
      />
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
    </div>
  );
}

export default JourneyApp;
