// useThemeMode.js

import { useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

export const useThemeMode = () => {
  const [mode, setMode] = useState("light");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  const toggleThemeMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return { theme, toggleThemeMode };
};
