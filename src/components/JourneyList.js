import React, { useState, useEffect } from "react";
import { Container, List, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import JourneyFormDialog from "./JourneyFormDialog";
import JourneyListItem from "./JourneyListItem";

const JourneyList = () => {
  const [journeys, setJourneys] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const savedJourneys = JSON.parse(localStorage.getItem("journeys")) || [];
    setJourneys(savedJourneys);
  }, []);

  const handleAddJourney = (newJourney) => {
    const updatedJourneys = [...journeys, newJourney];
    setJourneys(updatedJourneys);
    localStorage.setItem("journeys", JSON.stringify(updatedJourneys));
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container>
      <h2>Journey Manager</h2>
      
      {/* List of journeys */}
      <List>
        {journeys.map((journey, index) => (
          <JourneyListItem key={index} journey={journey} />
        ))}
      </List>

      {/* FAB Button to add a new journey */}
      <Fab
        color="primary"
        aria-label="add"
        onClick={handleClickOpen}
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        <AddIcon />
      </Fab>

      {/* Dialog containing the form */}
      <JourneyFormDialog
        open={open}
        onClose={handleClose}
        onAddJourney={handleAddJourney}
      />
    </Container>
  );
};

export default JourneyList;
