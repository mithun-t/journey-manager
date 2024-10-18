import React from "react";
import { TextField, MenuItem } from "@mui/material";

function DropDownField({ label, value, name, handleChange, datas }) {
  return (
    <TextField
      select
      label={label}
      name={name}
      value={value || ""} // Ensure value is set to an empty string if undefined
      onChange={handleChange}
      fullWidth
      size="small"
    >
      {datas.map((data, index) => (
        <MenuItem key={index} value={data.name}>
          {data.name} {/* Set value to data.name */}
        </MenuItem>
      ))}
    </TextField>
  );
}

export default DropDownField;
