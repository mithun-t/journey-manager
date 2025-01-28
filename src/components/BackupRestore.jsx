import React from "react";
import { Button, Box } from "@mui/material";

const BackupRestore = () => {
  const handleBackup = () => {
    const masters = {
      trains: JSON.parse(localStorage.getItem("trains")) || [],
      stations: JSON.parse(localStorage.getItem("stations")) || [],
      statuses: JSON.parse(localStorage.getItem("statuses")) || [],
      berths: JSON.parse(localStorage.getItem("berths")) || [],
      paymentModes: JSON.parse(localStorage.getItem("paymentModes")) || [],
      journeys: JSON.parse(localStorage.getItem("journeys")) || [],
    };

    const blob = new Blob([JSON.stringify(masters, null, 2)], {
      type: "application/json",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "journey_backup.json";
    link.click();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" }, // Stack on small screens, align horizontally on medium+
        gap: 2,
        justifyContent: "center", // Center the buttons horizontally
        alignItems: "center", // Center the buttons vertically
        mt: 3, // Optional margin-top for spacing from other content
      }}
    >
      <Button variant="contained" color="primary" onClick={handleBackup}>
        Backup Master & Journey Data
      </Button>
    </Box>
  );
};

export default BackupRestore;
