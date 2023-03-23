import { Box, TextField, InputAdornment, Button, Divider } from "@mui/material";
import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import LoadingPage from "components/misc/LoadingPage";
import { useAuthenticateRef } from "hooks/useAuthenticateRef";
import router from "next/router";
import Image from "next/image";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";
import useAlertStore from "stores/alertStore";
import background from "/public/images/background.svg";

/**
 * @author Luke Chester
 *
 * @description this is the register page
 *
 */

//exporting password schema
export const passwordSchema = z
  .string()
  .regex(new RegExp(".*[A-Z].*"), "One uppercase character")
  .regex(new RegExp(".*[a-z].*"), "One lowercase character")
  .regex(new RegExp(".*\\d.*"), "One number")
  .regex(
    new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
    "One special character"
  )
  .min(8, "Must be at least 8 characters in length");

export default function Register() {
  const { loading, authenticated, ref } = useAuthenticateRef();
  const [loadingRegister, setLoadingRegister] = useState(false);
  const { addAlert } = useAlertStore();

  //validation register schema
  const registerSchema = z
    .object({
      name: z
        .string()
        .min(3, "Name must contain at least 3 characters")
        .max(32),
      email: z
        .string()
        .email()
        .endsWith("@make-it-all.co.uk", "This is not a company email"),
      password: passwordSchema,
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: "Passwords do not match",
    });

  //infering a type
  type registerSchemaType = z.infer<typeof registerSchema>;

  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<registerSchemaType>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<registerSchemaType> = async (data) => {
    setLoadingRegister(true);
    let name = data.name;
    let email = data.email;
    let password = data.password;
    let newUser: { name: string; email: string; password: string } = {
      name,
      email,
      password,
    };
    try {
      const referral = ref;
      let response = await axios.post("/api/users/createUser", {
        newUser,
        referral,
      });

      if (response.status === 200) {
        let authenticated = response.data;
        if (authenticated) {
          addAlert("Registration Successful", "success");
          setLoadingRegister(false);
          router.push("/login");
        }
      }
      if (response.status === 500) {
        console.error("API Response error");
        setLoadingRegister(false);
      }
    } catch (error) {
      console.log("API error", error);
      addAlert("Could not connect to database", "error");
      setLoadingRegister(false);
    }
  };

  const registerPage = (
    <>
      <div className="w-screen h-screen flex flex-col gap-4 items-center justify-center">
        <Image
          src={background}
          alt="background"
          sizes="100vw"
          className="absolute object-cover w-full h-full"
        />
        <div
          className="flex flex-col bg-white border-spacing-1 rounded-md py-4 z-[10]
        px-4 shadow-lg"
        >
          <Box
            component="form"
            noValidate
            className="flex flex-col"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Image
              src={"/images/make-it-all.png"}
              alt={"make-it-all"}
              className="object-none object-center mx-auto"
              width={48}
              height={48}
            />
            <div className="text-center py-2 text-lg font-bold">
              Make-it-All
            </div>
            <div className="py-1"></div>
            <Divider />

            <div className="py-2"></div>
            <div className="flex flex-col items-center py-2">
              <TextField
                label="Full Name"
                required
                size="small"
                sx={{ m: 0.5, width: "35ch" }}
                error={!!errors["name"]}
                helperText={errors["name"] ? errors["name"].message : " "}
                {...register("name")}
              ></TextField>
            </div>
            <div className="flex flex-col items-center py-2">
              <TextField
                fullWidth
                id="email"
                required
                size="small"
                sx={{ m: 1, width: "35ch" }}
                label="Enter Email"
                type="email"
                error={!!errors["email"]}
                helperText={errors["email"] ? errors["email"].message : " "}
                {...register("email")}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircleIcon />
                    </InputAdornment>
                  ),
                }}
              ></TextField>
            </div>
            <div className="flex flex-col py-2">
              <TextField
                fullWidth
                id="password"
                size="small"
                required
                error={!!errors["password"]}
                helperText={
                  errors["password"] ? errors["password"].message : " "
                }
                {...register("password")}
                sx={{ m: 1, width: "35ch" }}
                label="Create your password"
                type="password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                }}
              ></TextField>
            </div>
            <div className="py-2">
              <TextField
                fullWidth
                id="confirm-password"
                size="small"
                sx={{ m: 1, width: "35ch" }}
                label="Confirm password"
                required
                type="password"
                error={!!errors["confirmPassword"]}
                helperText={
                  errors["confirmPassword"]
                    ? errors["confirmPassword"].message
                    : " "
                }
                {...register("confirmPassword")}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                }}
              ></TextField>
            </div>

            {loadingRegister ? (
              <Button
                variant="contained"
                size="small"
                className="w-full text-white"
                disabled
              >
                <ClipLoader size="15px" className="mr-2" color="#ffffff" />
                Creating Account...
              </Button>
            ) : (
              <Button
                type="submit"
                variant="contained"
                size="small"
                className="w-full"
              >
                Create Account
              </Button>
            )}
          </Box>
        </div>
      </div>
    </>
  );

  return loading ? (
    <LoadingPage variant={"spinner"} />
  ) : authenticated ? (
    <>{registerPage}</>
  ) : (
    <div className="p-8 flex items-center justify-center w-full h-screen text-2xl font-bold flex-col gap-8">
      Referral link is invalid or has expired!
      <Button variant={"contained"} onClick={() => router.push("/login")}>
        Back to Login
      </Button>
    </div>
  );
}
