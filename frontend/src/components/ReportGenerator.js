import React from "react";
import { Button } from "@mui/material";

const ReportGenerator = ({ onGenerateReport }) => {
  return (
    <div>
      <Button onClick={onGenerateReport}>Generate Report</Button>
      {/* Add more functionality for selecting report format and downloading */}
    </div>
  );
};

export default ReportGenerator;
