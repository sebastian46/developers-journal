import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

const JournalFilter = ({ onApplyFilter }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleFilter = () => {
    // Call the passed in `onApplyFilter` function with the filter values
    onApplyFilter({ startDate, endDate, searchQuery });
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      height="100%"
      sx={{ marginBottom: 2 }}
    >
      <Box display="flex" alignItems="center">
        <TextField
          label="Search Entries"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ marginRight: 1 }}
        />
        <Button variant="contained" color="primary" onClick={handleFilter}>
          Search
        </Button>
      </Box>
      <Box display="flex" alignItems="center">
        <TextField
          label="Start Date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ marginRight: 1 }}
        />
        <TextField
          label="End Date"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ marginRight: 1 }}
        />
        <Button onClick={handleFilter}>Apply Filters</Button>
      </Box>
    </Box>
  );
};

export default JournalFilter;
