import { Button } from "@mui/material";
import router from "next/router";
import React from "react";

/**
 * @author Tom Whitticase
 *
 * @description This is the 404 page component. It is used to display a 404 page when a user tries to access a page that does not exist.
 */

export default function NotFound() {
  return (
    <div className="z-10 flex justify-center items-center flex-col gap-8 fixed top-0 left-0 h-full w-full bg-white">
      <h1 className="text-3xl">404 Page not found</h1>

      <Button
        variant="contained"
        color="primary"
        onClick={() => router.push("/dashboard")}
      >
        Back to dashboard
      </Button>
    </div>
  );
}
