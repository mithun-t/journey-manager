import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
} from "@mui/material";
import DropDownField from "./Fields/DropDownField"; // Assuming you have a reusable dropdown component

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
    // Fetching master data from localStorage
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

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            size="small"
            fullWidth
            type="date"
            name="journey_date"
            label="Journey Date"
            value={formData?.journey_date || ""}
            onChange={handleChange}
            required
            InputLabelProps={{ shrink: true }}
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
          <TextField
            size="small"
            fullWidth
            name="pnr_number"
            label="PNR Number"
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
          <TextField
            size="small"
            fullWidth
            type="number"
            name="price"
            label="Price"
            value={formData?.price || ""}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            size="small"
            fullWidth
            type="date"
            name="booked_date"
            label="Booked Date"
            value={formData?.booked_date || ""}
            onChange={handleChange}
            required
            InputLabelProps={{ shrink: true }}
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
            <TextField
              size="small"
              fullWidth
              type="date"
              name="bill_date"
              label="Bill Date"
              value={formData?.bill_date || ""}
              onChange={handleChange}
              required
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        )}

        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                name="journey_status_checked"
                checked={formData.journey_status_checked || false}
                onChange={handleChange}
              />
            }
            label={`Journey Status: ${formData?.journey_status || "Pending"}`}
            style={{
              color:
                formData?.journey_status === "Completed" ? "green" : "orange",
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            size="small"
            fullWidth
            name="notes"
            label="Notes"
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
