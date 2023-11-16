import React from "react";
import { Button } from "@mui/material";

const ExpandCollapseButton = ({ expanded, onToggle }) => {
  return (
    <Button onClick={onToggle}>
      {expanded ? "Collapse All" : "Expand All"}
    </Button>
  );
};

export default ExpandCollapseButton;
