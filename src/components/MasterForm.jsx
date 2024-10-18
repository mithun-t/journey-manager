import React, { useState, useEffect } from "react";
import { TextField, Button, List, ListItem, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const MasterForm = (props) => {
  const [masters, setMasters] = useState([]);
  const [masterData, setMasterData] = useState({ code: "", name: "" });
  const [editingMaster, setEditingMaster] = useState(null);

  // Fetch data from localStorage
  useEffect(() => {
    fetchMasters();
  }, []);

  const fetchMasters = () => {
    const storedMasters =
      JSON.parse(localStorage.getItem(props.endpoint)) || [];
    setMasters(storedMasters);
  };

  const handleChange = (e) => {
    setMasterData({ ...masterData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingMaster) {
      // Update existing master data
      const updatedMasters = masters.map((master) =>
        master.id === editingMaster.id
          ? { ...editingMaster, ...masterData }
          : master
      );
      localStorage.setItem(props.endpoint, JSON.stringify(updatedMasters));
      setMasters(updatedMasters);
      resetForm();
    } else {
      // Add new master data
      const newMaster = {
        id: Date.now(), // Simple unique ID generator
        ...masterData,
      };
      const updatedMasters = [...masters, newMaster];
      localStorage.setItem(props.endpoint, JSON.stringify(updatedMasters));
      setMasters(updatedMasters);
      resetForm();
    }
  };

  const handleEdit = (data) => {
    setMasterData(data);
    setEditingMaster(data);
  };

  const handleDelete = (id) => {
    const updatedMasters = masters.filter((master) => master.id !== id);
    localStorage.setItem(props.endpoint, JSON.stringify(updatedMasters));
    setMasters(updatedMasters);
  };

  const resetForm = () => {
    setMasterData({ code: "", name: "" });
    setEditingMaster(null);
  };

  return (
    <div>
      <h2>{props.name}</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          size="small"
          label={`${props.name} Code`}
          name="code"
          value={masterData.code}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          size="small"
          label={`${props.name} Name`}
          name="name"
          value={masterData.name}
          onChange={handleChange}
          required
          fullWidth
          style={{ marginTop: 10 }}
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
        {masters.map((data) => (
          <ListItem key={data.id}>
            {data.name} ({data.code})
            <IconButton edge="end" onClick={() => handleEdit(data)}>
              <EditIcon />
            </IconButton>
            <IconButton edge="end" onClick={() => handleDelete(data.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default MasterForm;
