import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  CssBaseline,
  Grid,
} from "@mui/material";

function LoginPage() {
  // If you are using React Router, history is passed down to route components
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false); // Toggle between login and register
  const [errorMessage, setErrorMessage] = useState(""); // State to hold any error message
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    const url = `http://localhost:3001/${isRegistering ? "register" : "login"}`;

    // Send the username and password to the backend's /login endpoint
    try {
      const response = await fetch(url, {
        // Adjust the URL based on where your backend server is hosted
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        if (isRegistering) {
          console.log("Registration successful");
          setIsRegistering(false); // Switch back to login after successful registration
        } else {
          const data = await response.json();
          // Assuming the backend sends back a JWT token
          console.log("Login successful:", data.token);

          // Save the token in localStorage or context for future requests
          localStorage.setItem("token", data.token);

          // Redirect to dashboard
          login(data.token);
          navigate("/dashboard"); // This is how you redirect using React Router
        }
      } else {
        const data = await response;
        if (isRegistering) {
          console.log("Registration failed:", data);
          setErrorMessage(data.message || "Registration failed.");
        } else {
          // If the credentials are invalid or any other error occurs
          console.log("Login failed:", data);
          setErrorMessage(data.message || "Invalid login attempt.");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Failed to connect to the server");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          {isRegistering ? "Register" : "Login"}
        </Typography>
        {errorMessage && (
          <Typography color="error" align="center">
            {errorMessage}
          </Typography>
        )}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {isRegistering ? "Register" : "Login"}
          </Button>
          <Grid container>
            <Grid item>
              <Button
                onClick={() => setIsRegistering(!isRegistering)}
                variant="text"
              >
                {isRegistering
                  ? "Already have an account? Login"
                  : "Don't have an account? Register"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default LoginPage;
