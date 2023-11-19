import React, { useState } from "react";
import ReactQuill from "react-quill"; // Import ReactQuill
import "react-quill/dist/quill.snow.css"; // Import quill styles
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  CssBaseline,
} from "@mui/material";
function TagForm() {
  const [entry, setEntry] = useState({
    tagName: "",
    details: "",
  });
  const [error, setError] = useState(""); // For error messages

  const handleChange = (e) => {
    setEntry({
      ...entry,
      [e.target.name]: e.target.value,
    });
  };

  const handleDetailsChange = (value) => {
    setEntry({
      ...entry,
      details: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset any previous error
    const token = localStorage.getItem("token"); // Retrieve the JWT token from storage

    try {
      const response = await fetch("http://localhost:3001/api/tags", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
        body: JSON.stringify(entry),
      });

      const data = await response.json();

      if (response.ok) {
        // console.log("Tag Submitted:", data);
        setEntry({ tagName: "", details: "" }); // Reset the form after successful submission
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
    <Container component="main" maxWidth="md">
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
          Create a Tag
        </Typography>
        {error && (
          <Typography color="error" align="center">
            {error}
          </Typography>
        )}
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            mt: 1,
            width: "100%",
            maxWidth: { sm: "480px", md: "720px", lg: "1280px" },
          }}
        >
          {/* <TextField
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
          /> */}
          <TextField
            margin="normal"
            required
            fullWidth
            id="tagName"
            label="Tag"
            name="tagName"
            autoComplete="tagName"
            autoFocus
            value={entry.tagName}
            onChange={handleChange}
            sx={{ mb: 3 }}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="details"
            label="Details"
            name="details"
            type="details"
            InputLabelProps={{ shrink: true }}
            value={entry.details}
            onChange={handleChange}
            sx={{ mb: 3 }}
          />
          {/* <ReactQuill
            theme="snow"
            value={entry.details}
            onChange={handleDetailsChange}
            style={{ height: "300px", marginBottom: "50px" }}
          /> */}
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

export default TagForm;
