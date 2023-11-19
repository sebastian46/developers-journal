import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill"; // Import ReactQuill
import "react-quill/dist/quill.snow.css"; // Import quill styles
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  CssBaseline,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

function JournalEntryForm() {
  const [entry, setEntry] = useState({
    date: "",
    title: "",
    details: "",
    tags: [],
  });
  const [error, setError] = useState(""); // For error messages
  const [availableTags, setAvailableTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    const fetchTags = async () => {
      const token = localStorage.getItem("token"); // Retrieve the JWT token from storage

      try {
        const response = await fetch("http://localhost:3001/api/tags", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        });

        if (response.ok) {
          const tagsData = await response.json();
          console.log(tagsData);
          // Assuming the response is an array of tags
          setAvailableTags(tagsData.map((tag) => tag.tagName));
        } else {
          // Handle errors from the server
          console.error("Failed to fetch tags.");
        }
      } catch (error) {
        // Handle network errors
        console.error("Failed to fetch tags. Please try again later.");
      }
    };
    // console.log(availableTags);

    fetchTags();
    // console.log(availableTags);
  }, []);

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

  const handleTagChange = (event) => {
    setSelectedTags(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset any previous error
    const token = localStorage.getItem("token"); // Retrieve the JWT token from storage
    const journalEntryData = {
      ...entry,
      tags: selectedTags,
    };
    console.log(journalEntryData);

    try {
      const response = await fetch("http://localhost:3001/api/journal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
        body: JSON.stringify(journalEntryData),
      });

      const data = await response.json();

      if (response.ok) {
        // console.log("Journal Entry Submitted:", data);
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
          Add Journal Entry
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
          <FormControl fullWidth>
            <InputLabel id="tags-label">Tags</InputLabel>
            <Select
              labelId="tags-label"
              id="tags"
              multiple
              value={selectedTags}
              onChange={handleTagChange}
              renderValue={(selected) => selected.join(", ")}
              // MenuProps={MenuProps} // Optional, for customizing the dropdown menu
            >
              {availableTags.map((tag, i) => (
                <MenuItem key={i} value={tag}>
                  {tag}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
            sx={{ mb: 3 }}
          />
          <ReactQuill
            theme="snow"
            value={entry.details}
            onChange={handleDetailsChange}
            style={{ height: "300px", marginBottom: "50px" }}
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
