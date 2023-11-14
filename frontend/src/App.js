import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";
import JournalEntryForm from "./components/JournalEntryForm";
import ReportGenerator from "./components/ReportGenerator";
import NavBar from "./components/NavBar";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/journal-entry" element={<JournalEntryForm />} />
        <Route path="/report-generator" element={<ReportGenerator />} />
      </Routes>
    </Router>
  );
}

export default App;
