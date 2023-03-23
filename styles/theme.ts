import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      light: "hsl(41, 100%, 65%)",
      main: "hsl(41, 100%, 60%)",
      dark: "hsl(41, 100%,50%)",
      contrastText: "hsl(0, 100%, 100%)",
    },
    secondary: {
      light: "hsl(0, 0%, 28%)",
      main: "hsl(0, 0%, 20%)",
      dark: "hsl(0, 0%, 10%)",
      contrastText: "hsl(0, 100%, 100%)",
    },
    success: {
      light: "hsl(120, 70%, 50%)",
      main: "hsl(120, 70%, 45%)",
      dark: "hsl(120, 70%, 35%)",
      contrastText: "hsl(0, 100%, 100%)",
    },
    warning: {
      light: "hsl(5, 60%, 55%)",
      main: "hsl(5, 60%, 50%)",
      dark: "hsl(5, 60%, 40%)",
      contrastText: "hsl(0, 100%, 100%)",
    },
  },
});
