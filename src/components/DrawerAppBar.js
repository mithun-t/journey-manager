import React from "react";
import PropTypes from "prop-types";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Button,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu"; // Correct import for MenuIcon
import DarkModeIcon from "@mui/icons-material/DarkMode"; // Import icon for dark mode
import LightModeIcon from "@mui/icons-material/LightMode"; // Import icon for light mode

// Import components
import Dashboard from "./Dashboard"; // Dashboard component
import MasterForm from "./MasterForm"; // Master component
import JourneyApp from "./JourneyApp";
import BackupRestore from "./BackupRestore";

const drawerWidth = 240;
const navItems = ["Home", "Journeys", "Master", "Backup"];

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [activeComponent, setActiveComponent] = React.useState("Home");
  const [darkMode, setDarkMode] = React.useState(false); // State for dark mode

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleNavClick = (item) => {
    setActiveComponent(item);
    setMobileOpen(false);
  };

  // Handle theme toggle
  const handleThemeChange = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Journey Manager
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton
              sx={{ textAlign: "center" }}
              onClick={() => handleNavClick(item)}
            >
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light", // Use state for theme mode
    },
  });

  const renderComponent = () => {
    switch (activeComponent) {
      case "Home":
        return <Dashboard />;
      case "Journeys":
        return <JourneyApp />;
      case "Backup":
        return <BackupRestore />;
      case "Master":
        return (
          <>
            <MasterForm endpoint="trains" name="Train" />
            <MasterForm endpoint="stations" name="Station" />
            <MasterForm endpoint="statuses" name="Status" />
            <MasterForm endpoint="berths" name="Berth" />
            <MasterForm endpoint="payment_modes" name="Payment Mode" />
          </>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        <AppBar component="nav">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              Journey Manager
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {navItems.map((item) => (
                <Button
                  key={item}
                  sx={{ color: "#fff" }}
                  onClick={() => handleNavClick(item)}
                >
                  {item}
                </Button>
              ))}
            </Box>
            <IconButton
              color="inherit"
              onClick={handleThemeChange} // Toggle theme on click
              aria-label="toggle dark mode"
            >
              {darkMode ? <LightModeIcon /> : <DarkModeIcon />}{" "}
              {/* Change icon based on mode */}
            </IconButton>
          </Toolbar>
        </AppBar>

        <nav>
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </nav>

        <Box component="main" sx={{ p: 3, width: "100%" }}>
          <Toolbar />
          {renderComponent()} {/* Render the selected component */}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

DrawerAppBar.propTypes = {
  window: PropTypes.func,
};

export default DrawerAppBar;
