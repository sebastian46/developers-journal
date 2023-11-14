import React, { useState } from "react";

function JournalEntryForm() {
  const [entry, setEntry] = useState({
    date: "",
    title: "",
    details: "",
  });

  const handleChange = (e) => {
    setEntry({
      ...entry,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Journal Entry Submitted:", entry);
    // Here you would typically send the data to the backend
    // Reset the form after submission
    setEntry({ date: "", title: "", details: "" });
  };

  return (
    <div>
      <h1>Add Journal Entry</h1>
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
