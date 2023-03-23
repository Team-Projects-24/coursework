import {
  Avatar,
  Button,
  Chip,
  FormHelperText,
  TextField,
  Tooltip,
} from "@mui/material";

import { useEffect, useState } from "react";
import { IUser } from "../../types/User.d";
import UserAvatar from "../user/UserAvatar";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useProjects } from "hooks/useProjects";
import useAlertStore from "stores/alertStore";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { IProject } from "types/Project.d";
import { useRouter } from "next/router";
import axios from "axios";
import useUserStore from "stores/userStore";
import { passwordSchema } from "pages/register";
import { config } from "process";
import ClipLoader from "react-spinners/ClipLoader";

/**
 * @author Tom Whitticase, Luke Chester and Julia Lum
 *
 * @description This is the manage profile page. It is used to manage the user's profile.
 *
 * @param {IUser} user - the current user logged in
 * @returns JSX.Element
 *
 */

//Depending on role of user, will wrap in a coloured rounded box
const getRoleChip = (role: string) => {
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
};

interface IProps {
  user: IUser; //user to be edited
  reloadUserData: () => void; //callback to reload user data when user is updated
  loading: boolean;
}
export default function ManageProfile({
  user,
  reloadUserData,
  loading,
}: IProps) {
  const { setUser } = useUserStore();
  const { loading: loadingProjects, projects } = useProjects();
  const [myProjects, setMyProjects] = useState<IProject[]>([]);
  const [myProjectsManaging, setMyProjectsManaging] = useState<IProject[]>([]);
  const [nameError, setNameError] = useState(false);
  const [urlError, setUrlError] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [urlErrorMessage, setUrlErrorMessage] = useState("");
  const router = useRouter();
  const [value, setValue] = React.useState("1");
  const { addAlert } = useAlertStore();
  // Getting input from textfields
  const [name, setName] = useState(user.name);
  const [profileImage, setProfileImage] = useState(user.profileImage);
  //Password validation useStates
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmpasswordTextfieldError, setconfirmpasswordTextfieldError] =
    useState(false);
  const [textfieldError, setTextfieldError] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);

  useEffect(() => {
    //set my projects to projects that i am a member of
    setMyProjects(
      projects.filter((project) => project.userIds.includes(user.userId))
    );
    setMyProjectsManaging(
      projects.filter((project) => project.leaderId === user.userId)
    );
  }, [projects]);

  const handleSaveChanges = async () => {
    setLoadingSave(true);
    //validate inputs
    if (name === "") {
      setNameError(true);
      setNameErrorMessage("Name is invalid");
      return;
    }

    //check if profile image is a valid image url
    if (profileImage && profileImage !== "") {
      if (!profileImage.startsWith("http")) {
        setUrlError(true);
        setUrlErrorMessage("Please enter a valid URL");
        return;
      }
    }
    //check if password valid
    if (password != "") {
      const parsedPassword = passwordSchema.safeParse(password);
      if (!parsedPassword.success) {
        let errorString = "";
        let comma = ", ";
        parsedPassword.error.issues.forEach((error) => {
          errorString += error.message + comma;
        });
        setPasswordError(errorString);
        setTextfieldError(true);
        return;
      }
      if (confirmPassword != password) {
        let passwordNotMatch = "Passwords do not match";
        setConfirmPasswordError(passwordNotMatch);
        setTextfieldError(true);
        setconfirmpasswordTextfieldError(true);
        return;
      }
      setTextfieldError(false);
      setconfirmpasswordTextfieldError(false);
    }

    //save changes to database
    const newUser: IUser = {
      userId: user.userId,
      name: name,
      profileImage: profileImage,
      role: user.role,
    };

    try {
      const res = await axios.post("/api/users/editUser", { user: newUser });
      addAlert("Changes saved", "success");
      reloadUserData();
    } catch {
      addAlert("Error saving changes", "error");
    }
    setLoadingSave(false);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin": {
        return "blue";
      }
      case "employee": {
        return "yellow";
      }
      default: {
        return "red";
      }
    }
  };

  //changing tabs
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
      <ClipLoader
        className="absolute bottom-0 left-4 z-[10]"
        color={"#FFC107"}
        loading={loading}
        size={40}
      />
      <div style={{ width: 450, height: 570 }}>
        <div className="relative h-20 w-full object-cover object-center">
          <img
            className="h-20 w-full object-cover object-center"
            src="https://i.imgur.com/lKN4KSs.jpeg"
            alt="Cover image"
            style={{ height: 110, width: "100%" }}
          />
        </div>
        <div
          className="absolute h-full w-full"
          style={{ width: 450, height: 390 }}
        >
          <div className="flex flex-col items-center justify-center">
            <UserAvatar user={user} clickable={false} size={"large"} />
            <p className="font-bold text-xl">{user.name}</p>
            <p style={{ color: getRoleColor(user.role) }}>
              {getRoleChip(user.role)}
            </p>
          </div>
          <Box style={{ width: 450, height: 390 }} sx={{ typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab label="Overview" value="1" />
                  <Tab label="Projects" value="2" />
                  <Tab label="Edit Profile" value="3" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <div className="pb-4 text-gray-600 text-xs font-bold">
                  <p>CONTACT INFORMATION</p>
                </div>
                <ul className="space-y-2">
                  <li>Name: {user.name}</li>
                  <li>Email: {user.userId}</li>
                </ul>
              </TabPanel>
              <TabPanel value="2">
                {loadingProjects ? (
                  <div></div>
                ) : (
                  <>
                    <div className="pb-4 text-gray-600 text-xs font-bold">
                      <p>ASSIGNED TO</p>
                    </div>
                    {myProjects?.map((project, i) => (
                      <div key={i}>
                        <ListItem disablePadding>
                          <Tooltip title="View Tasks">
                            <ListItemButton
                              onClick={() => {
                                //change route to project page
                                router.push(`/tasks`);
                              }}
                            >
                              <ArrowRightIcon />
                              <ListItemText primary={project.name} />
                            </ListItemButton>
                          </Tooltip>
                        </ListItem>
                      </div>
                    ))}
                    <div className="pb-4 pt-4 text-gray-600 text-xs font-bold">
                      <p>MANAGING</p>
                    </div>
                    {myProjectsManaging?.map((project, i) => (
                      <div key={i}>
                        <ListItem disablePadding>
                          <Tooltip title="View Project">
                            <ListItemButton
                              onClick={() => {
                                //change route to project page
                                router.push(`/projects/${project.id}`);
                              }}
                            >
                              <ArrowRightIcon />
                              <ListItemText primary={project.name} />
                            </ListItemButton>
                          </Tooltip>
                        </ListItem>
                      </div>
                    ))}
                  </>
                )}
              </TabPanel>
              <TabPanel value="3">
                <div className="pb-4 text-gray-600 text-xs font-bold">
                  <p>CHANGES TO PROFILE</p>
                </div>
                <div className="justify-center">
                  <ul className="space-y-2">
                    <li className="p-1 justify-center">
                      <TextField
                        value={name}
                        id="outlined-basic"
                        error={nameError}
                        label="Name"
                        variant="outlined"
                        size="small"
                        style={{ width: "100%" }}
                        onChange={(e) => setName(e.currentTarget.value)}
                      />
                      <FormHelperText className="text-left" error>
                        {nameErrorMessage}
                      </FormHelperText>
                    </li>
                    <li className="p-1 justify-center">
                      <TextField
                        value={profileImage}
                        error={urlError}
                        id="outlined-basic"
                        label="Profile image URL"
                        variant="outlined"
                        size="small"
                        style={{ width: "100%" }}
                        onChange={(e) => setProfileImage(e.currentTarget.value)}
                      />
                      <FormHelperText className="text-left" error>
                        {urlErrorMessage}
                      </FormHelperText>
                    </li>
                    <li className="p-1 justify-center">
                      <TextField
                        fullWidth
                        id="password"
                        error={textfieldError}
                        size="small"
                        variant="outlined"
                        style={{ width: "100%" }}
                        label="Change your password"
                        type="password"
                        onChange={(e) => setPassword(e.currentTarget.value)}
                      ></TextField>
                      <FormHelperText className="text-left" error>
                        {textfieldError ? passwordError : ""}
                      </FormHelperText>
                    </li>
                    <li className="p-1 justify-center">
                      <TextField
                        fullWidth
                        error={confirmpasswordTextfieldError}
                        id="confirm-password"
                        variant="outlined"
                        size="small"
                        style={{ width: "100%" }}
                        label="Confirm new password"
                        type="password"
                        onChange={(e) =>
                          setConfirmPassword(e.currentTarget.value)
                        }
                      ></TextField>
                      <FormHelperText className="text-left" error>
                        {confirmpasswordTextfieldError
                          ? confirmPasswordError
                          : ""}
                      </FormHelperText>
                    </li>
                  </ul>
                </div>
                <div className="justify-end flex pt-4">
                  <Button
                    variant="contained"
                    onClick={() => handleSaveChanges()}
                    disabled={loadingSave}
                    sx={{ width: 200 }}
                  >
                    {loadingSave ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </TabPanel>
            </TabContext>
          </Box>
        </div>
      </div>
    </>
  );
}
