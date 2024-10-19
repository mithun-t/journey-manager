import React, { useEffect, useState } from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";

const Dashboard = () => {
  const [journeys, setJourneys] = useState([]);

  // Fetch journeys from local storage
  useEffect(() => {
    const storedJourneys = localStorage.getItem("journeys");
    if (storedJourneys) {
      setJourneys(JSON.parse(storedJourneys));
    }
  }, []);

  // Calculate statistics
  const totalJourneys = journeys.length;
  const totalPrice = journeys.reduce(
    (sum, journey) => sum + Number(journey.price),
    0
  );
  const averagePrice = totalJourneys
    ? (totalPrice / totalJourneys).toFixed(2)
    : 0;

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        {/* Total Journeys Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="h5">Total Journeys</Typography>
            <Typography variant="h4">{totalJourneys}</Typography>
          </Paper>
        </Grid>

        {/* Total Price Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="h5">Total Price</Typography>
            <Typography variant="h4">₹{totalPrice.toFixed(2)}</Typography>
          </Paper>
        </Grid>

        {/* Average Price Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="h5">Average Price</Typography>
            <Typography variant="h4">₹{averagePrice}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
