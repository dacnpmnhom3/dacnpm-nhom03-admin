import { createTheme, LinearProgress, ThemeProvider } from "@mui/material";
import React from "react";
import zxcvbn from "zxcvbn";

export default function PasswordStrength(props) {
  const testResult = zxcvbn(props.password);
  const num = (testResult.score * 100) / 4;

  const createPassLabel = () => {
    switch (testResult.score) {
      case 0:
        return "Too weak";
      case 1:
        return "Weak";
      case 2:
        return "Medium";
      case 3:
        return "Good";
      case 4:
        return "Strong";
      default:
        return "";
    }
  };

  const funcProgressColor = () => {
    switch (testResult.score) {
      case 0:
        return "#828282";
      case 1:
        return "#EA1111";
      case 2:
        return "#FFAD00";
      case 3:
        return "#9bc158";
      case 4:
        return "#00b500";
      default:
        return "none";
    }
  };

  const theme = createTheme({
    palette: {
      neutral: {
        main: funcProgressColor(),
        contrastText: "#fff",
      },
    },
  });

  return (
    <div className="strengthbar">
      <ThemeProvider theme={theme}>
        <LinearProgress
          color="neutral"
          variant="determinate"
          value={num}
          sx={{ background: "#F7F7F7", borderRadius: "5px" }}
        />
      </ThemeProvider>
      <p style={{ color: funcProgressColor(), textAlign: "right" }}>
        {createPassLabel()}
      </p>
    </div>
  );
}
