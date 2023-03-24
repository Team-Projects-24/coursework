import { Chip } from "@mui/material";

/**
 * @author Tom Whitticase
 *
 * @description This file contains utility functions and components for the user components.
 */

// Generates a color based on hashing a given string.
export function stringToColor(string: string) {
  let hash = 0;
  let i;
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = "#";
  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
}

// Returns a chip with the role of the user.
export function getRoleChip(role: string) {
  switch (role) {
    case "admin": {
      return (
        <Chip
          sx={{
            color: "white",
            backgroundColor: "red",
          }}
          label={role}
        />
      );
    }
    case "manager": {
      return (
        <Chip
          sx={{
            color: "white",
            backgroundColor: "orange",
          }}
          label={role}
        />
      );
    }
    case "employee": {
      return (
        <Chip
          sx={{
            color: "white",
            backgroundColor: "green",
          }}
          label={role}
        />
      );
    }
    default: {
      return (
        <Chip
          sx={{
            color: "black",
            backgroundColor: "white",
          }}
          label={role}
        />
      );
    }
  }
}
