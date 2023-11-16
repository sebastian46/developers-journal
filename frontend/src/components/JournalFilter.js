import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

const JournalFilter = ({ onApplyFilter }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleFilter = () => {
    // Call the passed in `onApplyFilter` function with the filter values
    onApplyFilter({ startDate, endDate, searchQuery });
  };

  return (
    <div>
      {/* <SearchFilter onSearch={handleSearchFilter} /> */}
      <TextField
        label="Search Entries"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <TextField
        label="Start Date"
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="End Date"
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
      />
      <Button onClick={handleFilter}>Apply Filters</Button>
    </div>
  );
};

export default JournalFilter;
