import React from "react";
import { TextField, MenuItem } from "@mui/material";

function DropDownField({ label, value, name, handleChange, datas }) {
  return (
    <TextField
      select
      label={label}
      name={name}
      value={value?.code || ""} // Use the code as value
      onChange={handleChange}
      fullWidth
      size="small"
    >
      {datas.map((data) => (
        <MenuItem key={data.id} value={JSON.stringify(data)}>
          {data.name} {/* Display the name as the visible text */}
        </MenuItem>
      ))}
    </TextField>
  );
}

export default DropDownField;
