import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  CssBaseline,
} from "@mui/material";

function JournalEntryForm() {
  const [entry, setEntry] = useState({
    date: "",
    title: "",
    details: "",
  });
  const [error, setError] = useState(""); // For error messages

  const handleChange = (e) => {
    setEntry({
      ...entry,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset any previous error
    const token = localStorage.getItem("token"); // Retrieve the JWT token from storage

    try {
      const response = await fetch("http://localhost:3001/api/journal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
        body: JSON.stringify(entry),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Journal Entry Submitted:", data);
        setEntry({ date: "", title: "", details: "" }); // Reset the form after successful submission
      } else {
        // Handle errors from the server
        setError(data.message || "An error occurred while saving the entry.");
      }
    } catch (error) {
      // Handle network errors
      setError("Failed to submit entry. Please try again later.");
    }
  };

  return (
    <Container component="main" maxWidth="sm">
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
          Add Journal Entry
        </Typography>
        {error && (
          <Typography color="error" align="center">
            {error}
          </Typography>
        )}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="date"
            label="Date"
            name="date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={entry.date}
            onChange={handleChange}
            sx={{ mb: 3 }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="Title"
            name="title"
            autoComplete="title"
            autoFocus
            value={entry.title}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="details"
            label="Details"
            id="details"
            multiline
            rows={4}
            value={entry.details}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default JournalEntryForm;
