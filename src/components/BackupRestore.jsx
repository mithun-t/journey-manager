import React from "react";
import { Button, Box } from "@mui/material";

const BackupRestore = () => {
  const handleBackup = () => {
    const masters = {
      trains: JSON.parse(localStorage.getItem("trains")) || [],
      stations: JSON.parse(localStorage.getItem("stations")) || [],
      statuses: JSON.parse(localStorage.getItem("statuses")) || [],
      berths: JSON.parse(localStorage.getItem("berths")) || [],
      payment_modes: JSON.parse(localStorage.getItem("payment_modes")) || [],
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

  const handleRestore = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = JSON.parse(event.target.result);
        if (data) {
          localStorage.setItem("trains", JSON.stringify(data.trains || []));
          localStorage.setItem("stations", JSON.stringify(data.stations || []));
          localStorage.setItem("statuses", JSON.stringify(data.statuses || []));
          localStorage.setItem("berths", JSON.stringify(data.berths || []));
          localStorage.setItem(
            "payment_modes",
            JSON.stringify(data.payment_modes || [])
          );
          localStorage.setItem("journeys", JSON.stringify(data.journeys || []));
          alert("Data restored successfully!");
        }
      };
      reader.readAsText(file);
    }
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
      <Button variant="contained" component="label" color="secondary">
        Restore Master & Journey Data
        <input
          type="file"
          hidden
          accept="application/json"
          onChange={handleRestore}
        />
      </Button>
    </Box>
  );
};

export default BackupRestore;
