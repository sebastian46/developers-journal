import React, { useState, useEffect } from "react";
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
import LabelIcon from "@mui/icons-material/Label"; // Tag Icon
import { useAuth } from "../AuthProvider";

function NavBar({ toggleThemeMode }) {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false); // State to control Drawer open/close
  const [userIcon, setUserIcon] = useState(null); // State for user icon URL

  // Fetch user profile data
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/users/profile",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          const avatarUrl = data.avatarUrl
            ? `http://localhost:3001/${data.avatarUrl.replace(/\\/g, "/")}`
            : null;
          setUserIcon(avatarUrl); // Set user icon URL if available
        } else {
          // Handle any errors
          console.error("Failed to fetch user profile.");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    if (isAuthenticated) {
      fetchUserProfile();
    }
  }, [isAuthenticated]);

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
      <ListItem
        button
        component={RouterLink}
        to="/create/tag"
        onClick={toggleDrawer(false)}
      >
        <ListItemIcon>
          <LabelIcon />
        </ListItemIcon>
        <ListItemText primary="Create Tags" />
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
                {userIcon ? (
                  <Avatar src={userIcon} alt="User" />
                ) : (
                  <Avatar>{"U"}</Avatar> // Default text or placeholder if no icon
                )}
              </IconButton>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
              <Button color="inherit" onClick={toggleThemeMode}>
                Toggle Night Mode
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
