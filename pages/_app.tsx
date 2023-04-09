import type { AppProps } from "next/app";
import Layout from "../components/layout/Layout";
import "../styles/globals.css";
import useAlertStore from "stores/alertStore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useEffect } from "react";
import { ThemeProvider } from "@mui/material";

import { Router, useRouter } from "next/router";
import "../styles/nprogress.css";
import nProgress from "nprogress";
import { theme } from "styles/theme";
import CssBaseline from "@mui/material/CssBaseline";
import useUserStore from "../stores/userStore";
import UserAvatar from "components/user/UserAvatar";
import "styles/ChatMenu.css";
import axios from "axios";

import "../styles/tlmstyles.css";

//page loading bar
Router.events.on("routeChangeStart", nProgress.start);
Router.events.on("routeChangeError", nProgress.done);
Router.events.on("routeChangeComplete", nProgress.done);

/**
 * @description This is the main app component. It is used to wrap all other components.
 */

export default function App({ Component, pageProps }: AppProps) {
  const { user } = useUserStore();
  const { alerts, removeAlert } = useAlertStore();
  const router = useRouter();

  //if user is null and not on login page or register page, redirect to login page
  useEffect(() => {
    if (
      !user &&
      router.pathname !== "/login" &&
      router.pathname !== "/register"
    ) {
      router.push("/login");
    }
  }, [user]);

  useEffect(() => {
    if (user && router.pathname === "/") {
      router.push("/dashboard");
    }
  })

  //when alerts change, loop through them and display and remove them
  useEffect(() => {
    //loop through alerts and display console log them
    alerts.forEach((alert) => {
      if (alert.type === "success") toast.success(alert.message);
      if (alert.type === "error") toast.error(alert.message);
      removeAlert(alert.id);
    });
  }, [alerts]);

  return (
    <>
      <CssBaseline />
      <ToastContainer />
      <ThemeProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  );
}
