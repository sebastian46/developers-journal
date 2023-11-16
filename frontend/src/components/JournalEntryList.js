import React from "react";
import {
  List,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  ListItemText,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const JournalEntryList = ({ entries }) => {
  return (
    <List>
      {entries.map((entry) => (
        <Accordion key={entry._id}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <ListItemText
              primary={new Date(entry.date).toLocaleDateString("en-US", {
                timeZone: "UTC",
              })}
              secondary={entry.title}
            />
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2">{entry.details}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </List>
  );
};

export default JournalEntryList;
