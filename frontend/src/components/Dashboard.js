import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
          {entries.map((entry) => (
            <li key={entry._id}>
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
