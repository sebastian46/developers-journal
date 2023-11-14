import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  // Placeholder data - this will be replaced with real data from the backend
  const recentEntries = [
    { id: 1, date: "2023-11-10", title: "Fixed bug in login module" },
    { id: 2, date: "2023-11-09", title: "Completed UI for report generator" },
    // Add more placeholder entries here
  ];

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to your journal dashboard!</p>
      <div>
        <Link to="/journal-entry">Add New Journal Entry</Link>
      </div>
      <div>
        <Link to="/report-generator">Generate Report</Link>
      </div>
      <div>
        <h2>Recent Entries</h2>
        <ul>
          {recentEntries.map((entry) => (
            <li key={entry.id}>
              {entry.date}: {entry.title}
            </li>
          ))}
        </ul>
      </div>
      {/* Additional dashboard features can be added here */}
    </div>
  );
}

export default Dashboard;
