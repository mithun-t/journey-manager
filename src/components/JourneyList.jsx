import React from "react";
import { List, ListItem, ListItemText, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

function JourneyList({ journeys, handleEdit, handleDelete }) {
  return (
    <List>
      {journeys &&
        journeys.map((journey) => (
          <ListItem
            key={journey.id}
            secondaryAction={
              <>
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={() => handleEdit(journey)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDelete(journey.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </>
            }
          >
            <ListItemText
              primary={`(${journey.train_number}) | ${journey.departure_station} to ${journey.arrival_station} | ${journey.journey_date}`}
              secondary={`PNR: ${journey.pnr_number} - Status: ${journey.status} - Berth: ${journey.berth} - Price: ${journey.price} - Payment: ${journey.payment_mode} - ${journey.journey_status}`}
            />
          </ListItem>
        ))}
    </List>
  );
}

export default JourneyList;
