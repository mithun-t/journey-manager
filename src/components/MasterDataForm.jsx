import React from "react";
import { Container, Grid, Paper } from "@mui/material";
import MasterForm from "./MasterForm";

function MasterDataForm() {
  const forms = [
    { endpoint: "trains", name: "Train" },
    { endpoint: "stations", name: "Station" },
    { endpoint: "statuses", name: "Status" },
    { endpoint: "berths", name: "Berth" },
    { endpoint: "payment_modes", name: "Payment Mode" },
  ];

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        {forms.map((form, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Paper elevation={3} style={{ padding: "20px" }}>
              <MasterForm endpoint={form.endpoint} name={form.name} />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default MasterDataForm;
