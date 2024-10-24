import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  Chip,
} from "@mui/material";

const Dashboard = () => {
  const [journeys, setJourneys] = useState([]);

  useEffect(() => {
    const storedJourneys = localStorage.getItem("journeys");
    if (storedJourneys) {
      setJourneys(JSON.parse(storedJourneys));
    }
  }, []);

  const totalJourneys = journeys.length;
  const totalPrice = journeys.reduce(
    (sum, journey) => sum + parseFloat(journey.price || 0),
    0
  );
  const averagePrice = totalJourneys
    ? (totalPrice / totalJourneys).toFixed(2)
    : 0;

  const statusCounts = journeys.reduce((acc, journey) => {
    if (journey.status) {
      acc[journey.status] = (acc[journey.status] || 0) + 1;
    }
    return acc;
  }, {});
  const berthCounts = journeys.reduce((acc, journey) => {
    if (journey.berth) {
      acc[journey.berth] = (acc[journey.berth] || 0) + 1;
    }
    return acc;
  }, {});

  const paymentModes = journeys.reduce((acc, journey) => {
    if (journey.payment_mode) {
      acc[journey.payment_mode] = (acc[journey.payment_mode] || 0) + 1;
    }
    return acc;
  }, {});

  const routes = journeys.reduce((acc, journey) => {
    if (journey.departure_station && journey.arrival_station) {
      const route = `${journey.departure_station} - ${journey.arrival_station}`;
      acc[route] = (acc[route] || 0) + 1;
    }
    return acc;
  }, {});
  const topRoutes = Object.entries(routes)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const monthlySpending = journeys.reduce((acc, journey) => {
    if (journey.journey_date) {
      const month = new Date(journey.journey_date).toLocaleString("default", {
        month: "long",
      });
      acc[month] = (acc[month] || 0) + parseFloat(journey.price || 0);
    }
    return acc;
  }, {});

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const mostCommonBerths =
    Object.entries(berthCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";

  const today = new Date();

  const upcomingJourneys = journeys
    .filter(
      (journey) =>
        new Date(journey.journey_date) >= today &&
        journey.status !== "Completed"
    )
    .slice(0, 5);

  const completedJourneys = journeys
    .filter(
      (journey) =>
        journey.status === "Completed" || new Date(journey.journey_date) < today
    )
    .slice(0, 5);

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Journey Dashboard
      </Typography>

      {/* Dashboard Metrics */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="h6">Total Journeys</Typography>
            <Typography variant="h4">{totalJourneys}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="h6">Total Spent</Typography>
            <Typography variant="h4">₹{totalPrice.toFixed(2)}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="h6">Average Fare</Typography>
            <Typography variant="h4">₹{averagePrice}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="h6">Most Common Berths</Typography>
            <Typography variant="h4">{mostCommonBerths}</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Upcoming Journeys */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Upcoming Journeys
            </Typography>
            <List>
              {upcomingJourneys.length ? (
                upcomingJourneys.map((journey, index) => (
                  <ListItem
                    key={index}
                    sx={{ flexDirection: "column", alignItems: "flex-start" }}
                  >
                    <Typography variant="subtitle1">
                      {journey.train_number || "N/A"}
                    </Typography>
                    <Typography variant="body2">
                      {formatDate(journey.journey_date)} •{" "}
                      {journey.departure_station || "N/A"} to{" "}
                      {journey.arrival_station || "N/A"}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        mt: 1,
                      }}
                    >
                      <Typography variant="subtitle1">
                        ₹{journey.price || "N/A"}
                      </Typography>
                      <Chip
                        label={journey.status || "N/A"}
                        color="primary"
                        size="small"
                      />
                    </Box>
                  </ListItem>
                ))
              ) : (
                <Typography>No upcoming journeys.</Typography>
              )}
            </List>
          </Paper>
        </Grid>
      </Grid>

      {/* Completed Journeys */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Completed Journeys
            </Typography>
            <List>
              {completedJourneys.length ? (
                completedJourneys.map((journey, index) => (
                  <ListItem
                    key={index}
                    sx={{ flexDirection: "column", alignItems: "flex-start" }}
                  >
                    <Typography variant="subtitle1">
                      {journey.train_number || "N/A"}
                    </Typography>
                    <Typography variant="body2">
                      {formatDate(journey.journey_date)} •{" "}
                      {journey.departure_station || "N/A"} to{" "}
                      {journey.arrival_station || "N/A"}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        mt: 1,
                      }}
                    >
                      <Typography variant="subtitle1">
                        ₹{journey.price || "N/A"}
                      </Typography>
                      <Chip
                        label={journey.status || "N/A"}
                        color="primary"
                        size="small"
                      />
                    </Box>
                  </ListItem>
                ))
              ) : (
                <Typography>No completed journeys.</Typography>
              )}
            </List>
          </Paper>
        </Grid>
      </Grid>
      {/* Journey Status Breakdown and Payment Modes */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Journey Status Breakdown
            </Typography>
            <List>
              {Object.entries(statusCounts).map(([status, count], index) => (
                <ListItem key={index} sx={{ justifyContent: "space-between" }}>
                  <Typography>{status}</Typography>
                  <Chip label={count} color="primary" />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Payment Mode Distribution
            </Typography>
            <List>
              {Object.entries(paymentModes).map(([mode, count], index) => (
                <ListItem key={index} sx={{ justifyContent: "space-between" }}>
                  <Typography>{mode}</Typography>
                  <Chip label={count} color="secondary" />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Monthly Spending Trend
            </Typography>
            <List>
              {Object.entries(monthlySpending).map(([month, total], index) => (
                <ListItem key={index} sx={{ justifyContent: "space-between" }}>
                  <Typography>{month}</Typography>
                  <Typography>₹{total.toFixed(2)}</Typography>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Top 5 Routes
            </Typography>
            <List>
              {topRoutes.map(([route, count], index) => (
                <ListItem key={index} sx={{ justifyContent: "space-between" }}>
                  <Typography>{route}</Typography>
                  <Chip label={count} color="primary" />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
