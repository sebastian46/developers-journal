import React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom"; // Import useNavigate hook
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Button,
} from "@mui/material";
import { useAuth } from "../AuthProvider";

function NavBar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate(); // Hook for navigation
  const userIcon = null; // Replace with user's icon if you have one

  const handleLogout = () => {
    logout();
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Developer Journal
        </Typography>
        {isAuthenticated ? (
          <>
            <IconButton
              color="inherit"
              onClick={() => navigate("/profile")} // Replace "/profile" with the actual profile path
              sx={{ p: 0 }}
            >
              <Avatar src={userIcon} alt="User">
                {!userIcon && "U"} {/* Default text if no icon is available */}
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
  );
}

export default NavBar;
