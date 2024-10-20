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
      JSON.parse(localStorage.getItem("payment_modes")) || [];

    setTrains(storedTrains);
    setStations(storedStations);
    setStatuses(storedStatuses);
    setBerths(storedBerths);
    setPaymentModes(storedPaymentModes);
  }, []);

  const handleCheckboxChange = (e) => {
    handleChange(e);
    const updatedStatus = e.target.checked ? "Completed" : "Pending";
    handleChange({
      target: {
        name: "journey_status",
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
            name="journey_date"
            type="date"
            value={
              formData?.journey_date || new Date().toISOString().substr(0, 10)
            }
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DropDownField
            label="Train"
            value={formData?.train_number || ""}
            name="train_number"
            handleChange={handleChange}
            datas={trains}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DropDownField
            label="Departure Station"
            value={formData?.departure_station || ""}
            name="departure_station"
            handleChange={handleChange}
            datas={stations}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DropDownField
            label="Arrival Station"
            value={formData?.arrival_station || ""}
            name="arrival_station"
            handleChange={handleChange}
            datas={stations}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            label="PNR Number"
            name="pnr_number"
            value={formData?.pnr_number || ""}
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
            name="booked_date"
            type="date"
            value={
              formData?.booked_date || new Date().toISOString().substr(0, 10)
            }
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DropDownField
            label="Payment Mode"
            value={formData?.payment_mode || ""}
            name="payment_mode"
            handleChange={handleChange}
            datas={paymentModes}
          />
        </Grid>
        {formData.payment_mode === "Credit" && (
          <Grid item xs={12} sm={6}>
            <CustomTextField
              label="Bill Date"
              name="bill_date"
              type="date"
              value={formData?.bill_date || ""}
              onChange={handleChange}
              required
            />
          </Grid>
        )}
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                name="journey_status_checked"
                checked={formData.journey_status_checked || false}
                onChange={handleCheckboxChange}
              />
            }
            label={
              <Typography
                variant="h6"
                sx={{
                  color: formData?.journey_status_checked
                    ? "lightgreen"
                    : "orange",
                }}
              >
                Journey Status:{" "}
                {formData?.journey_status_checked ? "Completed" : "Pending"}
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
