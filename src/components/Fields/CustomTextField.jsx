import React from "react";
import { TextField } from "@mui/material";

const CustomTextField = ({
  label,
  name,
  value,
  onChange,
  required = false,
  type = "text",
  multiline = false,
  rows = 1,
  shrink = true,
  ...rest
}) => {
  return (
    <TextField
      size="small"
      fullWidth
      name={name}
      label={label}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      multiline={multiline}
      rows={rows}
      InputLabelProps={{ shrink }}
      {...rest}
    />
  );
};

export default CustomTextField;
