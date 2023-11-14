import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";
import JournalEntryForm from "./components/JournalEntryForm";
import ReportGenerator from "./components/ReportGenerator";
import NavBar from "./components/NavBar";
import { AuthProvider } from "./AuthProvider";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/journal-entry"
            element={
              <PrivateRoute>
                <JournalEntryForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/report-generator"
            element={
              <PrivateRoute>
                <ReportGenerator />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
