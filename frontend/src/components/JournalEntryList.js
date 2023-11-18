import React, { useState, useEffect } from "react";
import {
  List,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  ListItemText,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DOMPurify from "dompurify";

const JournalEntryList = ({ entries, isExpanded }) => {
  // State to track the expansion state of each accordion
  // const sanitizedDetails = DOMPurify.sanitize(entry.details);
  const [expandedStates, setExpandedStates] = useState({});
  const [cleanEntry, setCleanEntry] = useState();

  useEffect(() => {
    // Update all expanded states when isExpanded changes
    const newExpandedStates = {};
    entries.forEach((entry) => {
      newExpandedStates[entry._id] = isExpanded;
    });
    setExpandedStates(newExpandedStates);
  }, [isExpanded, entries]);

  const handleAccordionChange = (entryId) => (event, newExpanded) => {
    setExpandedStates((prevExpandedStates) => ({
      ...prevExpandedStates,
      [entryId]: newExpanded,
    }));
  };

  const SanitizeHTML = ({ entry }) => (
    <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(entry) }} />
  );

  return (
    <List>
      {entries.map((entry) => (
        <Accordion
          key={entry._id}
          expanded={expandedStates[entry._id] || false}
          onChange={handleAccordionChange(entry._id)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${entry._id}-content`}
            id={`panel${entry._id}-header`}
          >
            <ListItemText
              primary={new Date(entry.date).toLocaleDateString("en-US", {
                timeZone: "UTC",
              })}
              secondary={entry.title}
            />
          </AccordionSummary>
          <AccordionDetails>
            <SanitizeHTML entry={entry.details} />
            {/* <Typography variant="body2">{entry.details}</Typography> */}
          </AccordionDetails>
        </Accordion>
      ))}
    </List>
  );
};

export default JournalEntryList;
