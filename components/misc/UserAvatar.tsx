import {
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { IUser } from "../../types/User.d";
import Popover from "./Popover";
import EmailIcon from "@mui/icons-material/Email";
import axios from "axios";

interface IProps {
  userEmail: string;
  size?: "small" | "medium" | "large";
  clickable?: boolean;
  border?: boolean;
}

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}
function getRoleChip(role: string) {
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
function getAvatar(size: string, user: IUser, border: boolean) {
  const avatarWidth = {
    small: 24,
    medium: 32,
    large: 40,
  }[size];
  const textSizeClass = {
    small: "text-xs",
    medium: "text-sm",
    large: "text-base",
  }[size];

  const sx = {
    bgcolor: stringToColor(user.name),
    border: border ? 2 : 0,
    width: avatarWidth,
    height: avatarWidth,
  };

  if (user.profileImage) {
    return <Avatar sx={sx} alt={user.name} src={user.profileImage} />;
  }
  return (
    <Avatar sx={sx}>
      {!user.profileImage && (
        <div className={textSizeClass}>
          {user.name.split(" ")[0][0]}
          {user.name.split(" ")[1][0]}
        </div>
      )}
    </Avatar>
  );
}
function getLoadingPlaceholderAvatar(size: string, border: boolean) {
  const avatarWidth = {
    small: 24,
    medium: 32,
    large: 40,
  }[size];
  const sx = {
    bgcolor: "#cccccc",
    border: border ? 2 : 0,
    width: avatarWidth,
    height: avatarWidth,
  };

  return <Avatar sx={sx}></Avatar>;
}

export default function UserAvatar({
  userEmail,
  clickable = true,
  size = "medium",
  border = false,
}: IProps) {
  const [user, setUser] = useState<IUser | null>();
  async function getUserInfo() {
    const data = { userEmail };
    try {
      const response = await axios.post("/api/users/getUserInfo", data);

      setUser(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <>
      {user ? (
        clickable ? (
          <Popover button={getAvatar(size, user, border)}>
            <List>
              <ListItem
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography variant={"h6"}>{user.name}</Typography>
                {getRoleChip(user.role)}
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    window.location.href = "mailto:" + user.email;
                  }}
                >
                  <ListItemIcon>
                    <EmailIcon />
                  </ListItemIcon>
                  <ListItemText primary={user.email} />
                </ListItemButton>
              </ListItem>
            </List>
          </Popover>
        ) : (
          getAvatar(size, user, border)
        )
      ) : (
        getLoadingPlaceholderAvatar(size, border)
      )}
    </>
  );
}
