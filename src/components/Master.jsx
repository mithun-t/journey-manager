import { Grid } from "@mui/material";
import React from "react";
import MasterForm from "./MasterForm";

const Master = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <MasterForm endpoint="trains" name="Train" />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <MasterForm endpoint="stations" name="Station" />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <MasterForm endpoint="statuses" name="Status" />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <MasterForm endpoint="berths" name="Berth" />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <MasterForm endpoint="paymentModes" name="Payment Mode" />
        </Grid>
      </Grid>
    </>
  );
};

export default Master;
