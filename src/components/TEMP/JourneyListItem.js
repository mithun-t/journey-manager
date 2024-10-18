import React from "react";
import { ListItem, ListItemText } from "@mui/material";

const JourneyListItem = ({ journey }) => {
  return (
    <ListItem>
      <ListItemText
        primary={`Journey Type: ${journey.type}`}
        secondary={
          <>
            <div>
              {journey.type === "Train"
                ? `Train Name: ${journey.trainName}`
                : `Bus Name: ${journey.busName}`}
            </div>
            <div>Coach: {journey.coach}</div>
            <div>Berth: {journey.berth}</div>
            <div>Booked Date: {journey.bookedDate}</div>
            <div>Booking Status: {journey.bookingStatus}</div>
            <div>Current Status: {journey.currentStatus}</div>
            <div>Paid Amount: {journey.paidAmount}</div>
            <div>Payment Mode: {journey.paymentMode}</div>
            {journey.paymentMode === "Credit Card" && (
              <div>Credit Card Bill Date: {journey.creditCardBillDate}</div>
            )}
            <div>
              Journey Status: {journey.journeyStatus ? "Completed" : "Pending"}
            </div>
            <div>Comments: {journey.comments}</div>
          </>
        }
      />
    </ListItem>
  );
};

export default JourneyListItem;
