import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material";
import DropDownField from "./Fields/DropDownField";
import CustomTextField from "./Fields/CustomTextField";

function JourneyForm({
  formData,
  handleChange,
  handleSubmit,
  handleClearForm,
  submitButtonText,
}) {
  const [trains, setTrains] = useState([]);
  const [stations, setStations] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [berths, setBerths] = useState([]);
  const [paymentModes, setPaymentModes] = useState([]);

  useEffect(() => {
    const storedTrains = JSON.parse(localStorage.getItem("trains")) || [];
    const storedStations = JSON.parse(localStorage.getItem("stations")) || [];
    const storedStatuses = JSON.parse(localStorage.getItem("statuses")) || [];
    const storedBerths = JSON.parse(localStorage.getItem("berths")) || [];
    const storedPaymentModes =
      JSON.parse(localStorage.getItem("paymentModes")) || [];
    if (
      storedTrains.length === 0 &&
      storedStations.length === 0 &&
      storedStatuses.length === 0 &&
      storedBerths.length === 0 &&
      storedPaymentModes.length === 0
    ) {
      alert("Add your Train, Station, etc datas in Master tab");
    }
    setTrains(
      storedTrains.length > 0
        ? storedTrains
        : [
            {
              name: "Train A",
            },
            {
              name: "Train B",
            },
          ]
    );
    setStations(
      storedStations.length > 0
        ? storedStations
        : [
            {
              name: "Station A",
            },
            {
              name: "Station B",
            },
          ]
    );
    setStatuses(
      storedStatuses.length > 0
        ? storedStatuses
        : [
            {
              name: "CNF",
            },
            {
              name: "RAC",
            },
            {
              name: "WL",
            },
          ]
    );
    setBerths(
      storedBerths.length > 0
        ? storedBerths
        : [
            {
              name: "Upper Berth",
            },
            {
              name: "Middle Berth",
            },
            {
              name: "Lower Berth",
            },
            {
              name: "Side Upper",
            },
            {
              name: "Side Lower",
            },
          ]
    );
    setPaymentModes(
      storedPaymentModes.length > 0
        ? storedPaymentModes
        : [
            {
              name: "UPI",
            },
            {
              name: "Credit Card",
            },
          ]
    );
  }, []);

  const handleCheckboxChange = (e) => {
    handleChange(e);
    const updatedStatus = e.target.checked ? "Completed" : "Pending";
    handleChange({
      target: {
        name: "journeyStatus",
        value: updatedStatus,
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} marginTop={1}>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            label="Journey Date"
            name="journeyDate"
            type="date"
            value={
              formData?.journeyDate || new Date().toISOString().substr(0, 10)
            }
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DropDownField
            label="Train"
            value={formData?.trainNumber || ""}
            name="trainNumber"
            handleChange={handleChange}
            datas={trains}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DropDownField
            label="Departure Station"
            value={formData?.departureStation || ""}
            name="departureStation"
            handleChange={handleChange}
            datas={stations}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DropDownField
            label="Arrival Station"
            value={formData?.arrivalStation || ""}
            name="arrivalStation"
            handleChange={handleChange}
            datas={stations}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            label="PNR Number"
            name="pnrNumber"
            value={formData?.pnrNumber || ""}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DropDownField
            label="Booking Status"
            value={formData?.status || ""}
            name="status"
            handleChange={handleChange}
            datas={statuses}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DropDownField
            label="Berth"
            value={formData?.berth || ""}
            name="berth"
            handleChange={handleChange}
            datas={berths}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            label="Price"
            name="price"
            type="number"
            value={formData?.price || ""}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            label="Booked Date"
            name="bookedDate"
            type="date"
            value={
              formData?.bookedDate || new Date().toISOString().substr(0, 10)
            }
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DropDownField
            label="Payment Mode"
            value={formData?.paymentMode || ""}
            name="paymentMode"
            handleChange={handleChange}
            datas={paymentModes}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                name="journeyStatusChecked"
                checked={formData.journeyStatusChecked || false}
                onChange={handleCheckboxChange}
              />
            }
            label={
              <Typography
                variant="h6"
                sx={{
                  color: formData?.journeyStatusChecked
                    ? "lightgreen"
                    : "orange",
                }}
              >
                Journey Status:{" "}
                {formData?.journeyStatusChecked ? "Completed" : "Pending"}
              </Typography>
            }
          />
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            label="Notes"
            name="notes"
            multiline
            rows={2}
            value={formData?.notes || ""}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Button
            size="small"
            type="submit"
            variant="contained"
            color="primary"
            style={{ margin: "20px" }}
          >
            {submitButtonText}
          </Button>
          <Button
            size="small"
            variant="contained"
            color="error"
            style={{ margin: "20px" }}
            onClick={handleClearForm}
          >
            Clear Form
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default JourneyForm;
