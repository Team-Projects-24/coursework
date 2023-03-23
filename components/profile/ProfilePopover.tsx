import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Modal from "../misc/Modal";
import ManageProfile from "./ManageProfile";
import Invite from "../misc/Invite";
import UserAvatar from "../user/UserAvatar";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LogoutIcon from "@mui/icons-material/Logout";
import Popover from "../misc/Popover";
import useUserStore from "stores/userStore";
import axios from "axios";
import useAlertStore from "stores/alertStore";
import { IUser } from "types/User.d";
import { useState } from "react";

/**
 * @author Tom Whitticase
 *
 * @description This component provides a popover that displays the user's profile information and allows them to sign out.
 */

export default function ProfilePopover() {
  const { addAlert } = useAlertStore();
  const { user, setUser } = useUserStore();
  const [loadingUser, setLoadingUser] = useState(false);
  const reloadcurrentUser = async () => {
    try {
      setLoadingUser(true);
      if (user) {
        const username = user.userId;
        const res = await axios.post("/api/users/getUserInfo", {
          username,
        });
        const updatedUser: IUser = res.data.user;
        console.log("updatedUser", updatedUser);
        setUser(updatedUser);
      } else {
        addAlert("User not logged in", "error");
      }
      setLoadingUser(false);
    } catch {
      addAlert("Unable to fetch updated user data", "error");
    }
  };

  const signOut = () => {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("password");
    setUser(null);
  };

  return (
    <>
      {user && (
        <Popover
          button={
            <button className="hover:outline outline-2 rounded-full">
              <UserAvatar user={user} clickable={false} />
            </button>
          }
        >
          <div className="flex flex-col">
            <div className="flex gap-4 p-4">
              <UserAvatar size={"medium"} user={user} clickable={false} />
              <div className="flex flex-col justify-start">
                <div className="text-xl">{user.name}</div>
                <div>{user.userId}</div>

                <Modal
                  title="My Profile"
                  button={
                    <div className="text-blue-500 my-1 text-left cursor-pointer">
                      Manage profile
                    </div>
                  }
                >
                  <ManageProfile
                    loading={loadingUser}
                    user={user}
                    reloadUserData={() => reloadcurrentUser()}
                  />
                </Modal>
              </div>
            </div>
            <Divider />

            <List disablePadding>
              <ListItem disablePadding>
                <Modal
                  button={
                    <ListItemButton>
                      <ListItemIcon>
                        <PersonAddIcon />
                      </ListItemIcon>
                      <ListItemText primary="Invite" />
                    </ListItemButton>
                  }
                >
                  <Invite user={user} />
                </Modal>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton onClick={() => signOut()}>
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText primary="Sign out" />
                </ListItemButton>
              </ListItem>
            </List>
          </div>
        </Popover>
      )}
    </>
  );
}
