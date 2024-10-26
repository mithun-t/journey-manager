import React, { useState } from "react";
import axios from "axios";

const PnrDetailsViewer = () => {
  const [pnr, setPnr] = useState("");
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setPnr(e.target.value);
  };

  const fetchPnrStatus = async () => {
    setLoading(true);
    setError(null);
    setStatus(null);

    try {
      const response = await axios.get("http://localhost:8000//status/", {
        params: { pnr: pnr },
      });
      setStatus(response.data);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to retrieve PNR status");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchPnrStatus();
  };

  return (
    <div>
      <h1>PNR Status Checker</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter PNR:
          <input
            type="text"
            value={pnr}
            onChange={handleInputChange}
            placeholder="Enter 10-digit PNR"
            required
          />
        </label>
        <button type="submit" disabled={loading || !pnr}>
          Check Status
        </button>
      </form>

      {loading && <p>Loading...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {status && (
        <div>
          <h2>PNR Details</h2>
          <p>
            <strong>Train:</strong> {status.TrainNo} - {status.TrainName}
          </p>
          <p>
            <strong>From:</strong> {status.SourceName} ({status.From})
          </p>
          <p>
            <strong>To:</strong> {status.DestinationName} ({status.To})
          </p>
          <p>
            <strong>Date of Journey:</strong> {status.Doj}
          </p>
          <p>
            <strong>Departure:</strong> {status.DepartureTime}
          </p>
          <p>
            <strong>Arrival:</strong> {status.ArrivalTime}
          </p>
          <p>
            <strong>Duration:</strong> {status.Duration}
          </p>
          <p>
            <strong>Booking Status:</strong>{" "}
            {status.PassengerStatus[0].BookingStatus}
          </p>
          <p>
            <strong>Current Status:</strong>{" "}
            {status.PassengerStatus[0].CurrentStatus}
          </p>
          <p>
            <strong>Coach & Berth:</strong> {status.PassengerStatus[0].Coach} -{" "}
            {status.PassengerStatus[0].Berth} (
            {status.PassengerStatus[0].BookingBerthCode})
          </p>
          <p>
            <strong>Fare:</strong> ₹{status.BookingFare}
          </p>
          <p>
            <strong>Expected Platform No:</strong> {status.ExpectedPlatformNo}
          </p>

          <h3>Train Ratings</h3>
          <p>
            <strong>Overall Rating:</strong> {status.Rating} / 5
          </p>
          <p>
            <strong>Food Rating:</strong> {status.FoodRating}
          </p>
          <p>
            <strong>Punctuality Rating:</strong> {status.PunctualityRating}
          </p>
          <p>
            <strong>Cleanliness Rating:</strong> {status.CleanlinessRating}
          </p>

          <img
            src={status.FlightBannerUrl}
            alt="Flight Banner"
            style={{ width: "100%", marginTop: "10px" }}
          />
        </div>
      )}
    </div>
  );
};

export default PnrDetailsViewer;
