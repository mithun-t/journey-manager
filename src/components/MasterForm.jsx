import React, { useState, useEffect, useCallback } from "react";
import { TextField, Button, List, ListItem, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const MasterForm = (props) => {
  const [masters, setMasters] = useState([]);
  const [masterData, setMasterData] = useState({ name: "" });
  const [editingMaster, setEditingMaster] = useState(null);

  const fetchMasters = useCallback(() => {
    const storedMasters =
      JSON.parse(localStorage.getItem(props.endpoint)) || [];
    setMasters(storedMasters);
  }, [props.endpoint]);

  useEffect(() => {
    fetchMasters();
  }, [fetchMasters]);

  const handleChange = (e) => {
    setMasterData({ ...masterData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingMaster) {
      const updatedMasters = masters.map((master) =>
        master.name === editingMaster.name ? { ...masterData } : master
      );
      localStorage.setItem(props.endpoint, JSON.stringify(updatedMasters));
      setMasters(updatedMasters);
      resetForm();
    } else {
      const newMaster = {
        name: masterData.name,
      };
      const updatedMasters = [...masters, newMaster];
      localStorage.setItem(props.endpoint, JSON.stringify(updatedMasters));
      setMasters(updatedMasters);
      resetForm();
    }
  };

  const handleEdit = (data) => {
    setMasterData({ name: data.name });
    setEditingMaster(data);
  };

  const handleDelete = (name) => {
    const updatedMasters = masters.filter((master) => master.name !== name);
    localStorage.setItem(props.endpoint, JSON.stringify(updatedMasters));
    setMasters(updatedMasters);
  };

  const resetForm = () => {
    setMasterData({ name: "" });
    setEditingMaster(null);
  };

  return (
    <div>
      <h2>{props.name}</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          size="small"
          label={`${props.name} Name`}
          name="name"
          value={masterData.name}
          onChange={handleChange}
          required
          fullWidth
        />
        <Button
          size="small"
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: 10 }}
        >
          {editingMaster ? `Update ${props.name}` : `Add ${props.name}`}
        </Button>
      </form>

      <List>
        {masters.map((data, index) => (
          <ListItem key={index}>
            {data.name} {/* Display only name */}
            <IconButton edge="end" onClick={() => handleEdit(data)}>
              <EditIcon />
            </IconButton>
            <IconButton edge="end" onClick={() => handleDelete(data.name)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default MasterForm;
