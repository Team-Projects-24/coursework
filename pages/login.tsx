import {
  Box,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import router from "next/router";
import useUserStore from "stores/userStore";
import { IUser } from "types/User.d";
import React from "react";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";
import useAlertStore from "stores/alertStore";
import background from "/public/images/background.svg";

/**
 * @author Luke Chester and Tom Whitticase
 *
 * @description this is the login page
 *
 * @returns Login page
 */

export default function Login() {
  //useStates
  const { setUser } = useUserStore();
  const { addAlert } = useAlertStore();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setError] = useState("");
  const [inputError, setInputError] = useState(false);
  const [checked, setChecked] = useState(true);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const checkedToString = "true";

  //Show/hide password
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  //Checking if any stored user info - if so, append textfields with this information
  useEffect(() => {
    setUsername(getUsernamePlaceHolder());
    setPassword(getPasswordPlaceHolder());
  }, []);

  // If authentication is successful then save user information and redirect to dashboard
  const handleLoginSuccess = async (username: string, password: string) => {
    try {
      const res = await axios.post("/api/users/getUserInfo", {
        username,
      });
      if (res.status === 200) {
        const { user } = res.data;
        setUser(user as IUser);
        // sessionStorage.setItem("username", username);
        // sessionStorage.setItem("password", password);

        router.push("/dashboard");
      } else {
        throw new Error("Unable to set user.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  //Check textfields to see whether login information matches the database
  async function authenticate(username: string, password: string) {
    if (!username || !password) {
      setError("Please enter your username and password");
      setInputError(true);
      return;
    }
    const data = {
      username,
      password,
    };

    setLoadingLogin(true);
    try {
      const response = await axios.post(
        "/api/users/authenticateLoginDetails",
        data
      );
      handleLoginSuccess(username, password);
    } catch (error: any) {
      if (error.response.status === 401) {
        setError("Incorrect username or password");
        setInputError(true);
      }
      if (error.response.status === 500) {
        addAlert("Server error", "error");
      }
      setLoadingLogin(false);
    }
  }

  //On login page check to see if anything stored in local storage, then fill in textfields

  function getUsernamePlaceHolder(): string {
    if (typeof window === "undefined") {
      return "";
    }
    if (typeof localStorage !== "undefined") {
      const username = localStorage.getItem("username");
      if (username) {
        return username;
      }
      return "";
    }
    return "";
  }

  function getPasswordPlaceHolder(): string {
    if (typeof window === "undefined") {
      return "";
    }
    if (typeof localStorage !== "undefined") {
      const storedPassword = localStorage.getItem("password");
      if (storedPassword) {
        return storedPassword;
      }
      return "";
    }
    return "";
  }

  //save data to local storage
  function saveDataTolocalStorage() {
    if (checked === true) {
      localStorage.setItem("remember user", checkedToString);
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
    }
    if (checked === false) {
      localStorage.clear();
    }
  }

  return (
    <>
      <div className="w-screen h-screen flex flex-col gap-4 items-center justify-center bg-yellow-500">
        <Image
          src={background}
          alt="background"
          sizes="100vw"
          className="absolute object-cover w-full h-full"
        />
        <Box
          className="z-[10] shadow-lg"
          component="span"
          sx={{ p: 2, background: "white", borderRadius: 1 }}
        >
          <div className="py-4 w-full">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                src={"/images/make-it-all.png"}
                alt={"make-it-all"}
                className=""
                width={48}
                height={48}
              />
              <div className="text-center py-2 text-lg font-bold">
                Make-it-All
              </div>
              <div className="w-full">
                <Divider />
              </div>

              <div className="py-1"></div>
              <div className="py-3">
                <TextField
                  fullWidth
                  id="username"
                  size="small"
                  value={username}
                  // variant="outline"
                  sx={{ m: 1, width: "35ch" }}
                  label="Email"
                  type="email"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircleIcon />
                      </InputAdornment>
                    ),
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      authenticate(username, password);
                    }
                  }}
                  placeholder={"Enter your Email"}
                  error={inputError}
                  onChange={(e) => setUsername(e.currentTarget.value)}
                ></TextField>
              </div>

              <FormControl
                fullWidth
                sx={{ m: 1, width: "35ch" }}
                variant="outlined"
                size="small"
              >
                <InputLabel>Password</InputLabel>
                <OutlinedInput
                  id="standard-adornment-password"
                  type={showPassword ? "text" : "password"}
                  startAdornment={
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  }
                  error={inputError}
                  placeholder={"Enter your Password"}
                  value={password}
                  onChange={(e) => setPassword(e.currentTarget.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      authenticate(username, password);
                    }
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>

              <div className="justify-center text-center">
                <FormHelperText className="text-center" error>
                  {errorMessage}
                </FormHelperText>
              </div>
              <FormControlLabel
                control={<Checkbox />}
                label="Remember me"
                labelPlacement="start"
                value={checked}
                onChange={() => {
                  setChecked(!checked);

                  saveDataTolocalStorage();
                }}
              />
              <div className="w-full">
                {loadingLogin ? (
                  <Button
                    variant="contained"
                    size="small"
                    className="w-full text-white"
                    disabled
                  >
                    <ClipLoader size="15px" className="mr-2" color="#ffffff" />
                    Loading...
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    size="small"
                    className="w-full"
                    onClick={() => {
                      authenticate(username, password);
                    }}
                  >
                    Login
                  </Button>
                )}
              </div>
            </Box>
          </div>
        </Box>
      </div>
    </>
  );
}
