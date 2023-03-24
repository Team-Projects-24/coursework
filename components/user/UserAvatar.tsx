import {
  Avatar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { IUser } from "../../types/User.d";
import Popover from "../misc/Popover";
import EmailIcon from "@mui/icons-material/Email";
import { getRoleChip, stringToColor } from "./userUtils";

/**
 * @author Tom Whitticase
 *
 * @description Provides an avatar that can be clicked to show a popover with user information.
 *
 * @param user - The user to display
 * @param size - The size of the avatar
 * @param clickable - Whether the avatar is clickable
 * @param border - Whether the avatar has a border
 *
 * @returns JSX.Element
 */

interface IProps {
  user: IUser;
  size?: "small" | "medium" | "large";
  clickable?: boolean;
  border?: boolean;
}

function getAvatar(size: string, user: IUser, border: boolean) {
  const avatarWidth = {
    small: 24,
    medium: 32,
    large: 60,
  }[size];
  const textSizeClass = {
    small: "text-xs",
    medium: "text-sm",
    large: "text-base",
  }[size];

  const sx = {
    bgcolor: stringToColor(user.name),
    border: border ? 2 : 0,
    borderColor: "white",
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
          {user.name && user.name.split(" ").length >= 1
            ? user.name.split(" ")[0][0] +
              (user.name.split(" ").length > 1
                ? user.name.split(" ")[1][0]
                : "")
            : ""}
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
  user,
  clickable = true,
  size = "medium",
  border = false,
}: IProps) {
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
                    window.location.href = "mailto:" + user.userId;
                  }}
                >
                  <ListItemIcon>
                    <EmailIcon />
                  </ListItemIcon>
                  <ListItemText primary={user.userId} />
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
