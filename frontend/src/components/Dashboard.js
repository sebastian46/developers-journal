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
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function Dashboard() {
  const [entries, setEntries] = useState([]); // State to hold the journal entries
  const [loading, setLoading] = useState(true); // State to indicate loading status
  const [error, setError] = useState(""); // State to hold any error message

  useEffect(() => {
    const fetchEntries = async () => {
      const token = localStorage.getItem("token"); // Retrieve the JWT token from storage

      try {
        const response = await fetch("http://localhost:3001/api/journal", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        });

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

    fetchEntries();
  }, []);

  return (
    <Container>
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
          variant="outlined"
          color="secondary"
          component={RouterLink}
          to="/report-generator"
        >
          Generate Report
        </Button>
      </Box>
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2">
            Recent Entries
          </Typography>
          {loading ? (
            <CircularProgress />
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : (
            <List>
              {entries.map((entry) => (
                <Accordion key={entry._id}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <ListItemText
                      primary={new Date(entry.date).toLocaleDateString()}
                      secondary={entry.title}
                    />
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body2">{entry.details}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </List>
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
