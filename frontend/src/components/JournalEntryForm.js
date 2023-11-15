import React, { useState } from "react";

function JournalEntryForm() {
  const [entry, setEntry] = useState({
    date: "",
    title: "",
    details: "",
  });
  const [error, setError] = useState(""); // For error messages

  const handleChange = (e) => {
    setEntry({
      ...entry,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset any previous error
    const token = localStorage.getItem("token"); // Retrieve the JWT token from storage

    try {
      const response = await fetch("http://localhost:3001/api/journal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
        body: JSON.stringify(entry),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Journal Entry Submitted:", data);
        setEntry({ date: "", title: "", details: "" }); // Reset the form after successful submission
      } else {
        // Handle errors from the server
        setError(data.message || "An error occurred while saving the entry.");
      }
    } catch (error) {
      // Handle network errors
      setError("Failed to submit entry. Please try again later.");
    }
  };

  return (
    <div>
      <h1>Add Journal Entry</h1>
      {error && <p className="error">{error}</p>}{" "}
      {/* Display any error message */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={entry.date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={entry.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Details:</label>
          <textarea
            name="details"
            value={entry.details}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default JournalEntryForm;
