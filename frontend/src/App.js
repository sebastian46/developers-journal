import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";
import JournalEntryForm from "./components/JournalEntryForm";
import ReportGenerator from "./components/ReportGenerator";
import NavBar from "./components/NavBar";
import { AuthProvider } from "./AuthProvider";
import PrivateRoute from "./PrivateRoute";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import Container from "@mui/material/Container";
import Profile from "./components/Profile";
import { useThemeMode } from "./components/useThemeMode";
import TagForm from "./components/Forms/TagForm";
// Create a theme instance.
const theme = createTheme({
  // Customize your theme here
});

function App() {
  const { theme, toggleThemeMode } = useThemeMode();

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Router>
          <NavBar toggleThemeMode={toggleThemeMode} />
          <Container>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              ></Route>
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
              <Route
                path="/create/tag"
                element={
                  <PrivateRoute>
                    <TagForm />
                  </PrivateRoute>
                }
              />
            </Routes>
          </Container>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
