import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu"; // Import Menu icon
import DashboardIcon from "@mui/icons-material/Dashboard"; // Import Dashboard icon
import AddBoxIcon from "@mui/icons-material/AddBox"; // Import AddBox icon for adding journal entry
import { useAuth } from "../AuthProvider";

function NavBar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false); // State to control Drawer open/close
  const userIcon = null; // Replace with user's icon if you have one

  // Toggle drawer open/close
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Define the list of navigation items for the drawer
  const drawerList = () => (
    <List>
      <ListItem
        button
        component={RouterLink}
        to="/dashboard"
        onClick={toggleDrawer(false)}
      >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem
        button
        component={RouterLink}
        to="/journal-entry"
        onClick={toggleDrawer(false)}
      >
        <ListItemIcon>
          <AddBoxIcon />
        </ListItemIcon>
        <ListItemText primary="Add Journal Entry" />
      </ListItem>
      {/* Add more navigation items here */}
    </List>
  );

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Developer Journal
          </Typography>
          {isAuthenticated ? (
            <>
              <IconButton
                color="inherit"
                onClick={() => navigate("/profile")}
                sx={{ p: 0 }}
              >
                <Avatar src={userIcon} alt="User">
                  {!userIcon && "U"}{" "}
                  {/* Default text if no icon is available */}
                </Avatar>
              </IconButton>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Button color="inherit" component={RouterLink} to="/login">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerList()}
      </Drawer>
    </>
  );
}

export default NavBar;
