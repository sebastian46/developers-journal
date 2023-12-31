import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  CardContent,
  CardActions,
  CssBaseline,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import JournalFilter from "./JournalFilter";
import JournalEntryList from "./JournalEntryList";
import ReportGenerator from "./ReportGenerator";
import ExpandCollapseButton from "./ExpandCollapseButton";
import TagsFilter from "./Filters/TagsFilter";

function Dashboard() {
  const [entries, setEntries] = useState([]); // State to hold the journal entries
  const [loading, setLoading] = useState(true); // State to indicate loading status
  const [error, setError] = useState(""); // State to hold any error message
  const [filters, setFilters] = useState({});
  const [isExpanded, setIsExpanded] = useState(false);
  const [availableTags, setAvailableTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    const fetchEntries = async () => {
      const token = localStorage.getItem("token"); // Retrieve the JWT token from storage
      // const queryParams = new URLSearchParams(filters).toString();
      const queryParams = new URLSearchParams(
        Object.entries(filters).reduce((acc, [key, value]) => {
          acc[key] = Array.isArray(value) ? value.join(",") : value;
          return acc;
        }, {})
      ).toString();
      console.log(queryParams);

      try {
        const response = await fetch(
          `http://localhost:3001/api/journal?${queryParams}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setEntries(data); // Store the journal entries in state
        } else {
          // Handle errors from the server
          setError(data.message || "Failed to fetch entries.");
        }
      } catch (error) {
        // Handle network errors
        setError("Failed to fetch entries. Please try again later.");
      } finally {
        setLoading(false); // Set loading to false after the request is completed
      }
    };

    // Fetch the tags
    const fetchTags = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(`http://localhost:3001/api/tags`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setAvailableTags(data); // Assuming the data is an array of tag objects
        } else {
          // Handle errors
          console.error("Failed to fetch tags");
        }
      } catch (error) {
        // Handle network errors
        console.error("Network error while fetching tags", error);
      }
    };

    fetchTags(selectedTags);
    fetchEntries();
  }, [filters]); // Add filters to dependency array to refetch when they change

  const handleApplyFilter = (newFilters) => {
    console.log(newFilters);
    // Assuming newFilters includes a 'tags' property with an array of selected tag names
    setFilters((prevFilters) => ({
      ...prevFilters, // Spread any existing filters to keep them
      ...newFilters, // Spread new filters which may overwrite existing ones
      // Specifically ensure that the 'tags' filter is set, even if newFilters doesn't include it
      tags: selectedTags || [],
    }));
  };

  const handleGenerateReport = () => {
    // Logic to generate report based on the current entries and filters
  };

  const handleExpandToggle = () => {
    // console.log(!isExpanded);
    setIsExpanded(!isExpanded);
  };

  return (
    <Container>
      <CssBaseline />
      <Typography variant="h2" component="h1" gutterBottom>
        Dashboard
      </Typography>
      <Typography paragraph>Welcome to the Dashboard</Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
        <Button
          variant="contained"
          color="primary"
          component={RouterLink}
          to="/journal-entry"
        >
          Add New Journal Entry
        </Button>
        <Button
          variant="contained"
          color="secondary"
          component={RouterLink}
          to="/report-generator"
        >
          Generate Report
        </Button>
      </Box>
      <JournalFilter onApplyFilter={handleApplyFilter} />
      <TagsFilter
        availableTags={availableTags}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
        onApplyFilter={handleApplyFilter}
      />
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2">
            Recent Entries
          </Typography>
          <ExpandCollapseButton
            expanded={isExpanded}
            onToggle={handleExpandToggle}
          />
          {loading ? (
            <CircularProgress />
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : (
            <JournalEntryList entries={entries} isExpanded={isExpanded} />
          )}
        </CardContent>
        <CardActions>
          {/* Add actions for the card like 'View All' if needed */}
        </CardActions>
      </Card>
    </Container>
  );
}

export default Dashboard;
