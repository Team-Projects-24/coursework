import {
  Avatar,
  Box,
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
import Popover from "../misc/Popover";
import EmailIcon from "@mui/icons-material/Email";
import axios from "axios";
import { getRoleChip, stringToColor } from "./userUtils";

interface IProps {
  userEmail: string;
  size?: "small" | "medium" | "large";
  clickable?: boolean;
  border?: boolean;
}

function getAvatar(user: IUser) {
  const avatarWidth = 24;
  const textSizeClass = "text-xs";
  const sx = {
    bgcolor: stringToColor(user.name),
    width: avatarWidth,
    height: avatarWidth,
  };

  if (user.profileImage) {
    return <Avatar sx={sx} alt={user.name} src={user.profileImage} />;
  }
  return (
    <Chip
      label={
        <Box
          sx={{
            display: "flex",
            gap: 1,
            justifyContent: "center",
            alignItems: "center",
            marginLeft: -1,
          }}
        >
          <Avatar sx={sx}>
            {!user.profileImage && (
              <div className={textSizeClass}>
                {user.name.split(" ")[0][0]}
                {user.name.split(" ")[1][0]}
              </div>
            )}
          </Avatar>
          <Typography>{user.name}</Typography>
        </Box>
      }
    />
  );
}
function getLoadingPlaceholderAvatar() {
  const avatarWidth = 24;

  const sx = {
    bgcolor: "#cccccc",
    width: avatarWidth,
    height: avatarWidth,
  };

  return <Avatar sx={sx}></Avatar>;
}

export default function UserChip({ userEmail, clickable = true }: IProps) {
  const [user, setUser] = useState<IUser | null>();
  async function getUserInfo() {
    const data = { userEmail };
    try {
      const response = await axios.post("/api/users/getUserInfo", data);
      setUser(response.data.user);
    } catch (error) {
      console.error("unable to fetch user info", error);
    }
  }
  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <>
      {user ? (
        clickable ? (
          <Popover button={getAvatar(user)}>
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
          getAvatar(user)
        )
      ) : (
        getLoadingPlaceholderAvatar()
      )}
    </>
  );
}
