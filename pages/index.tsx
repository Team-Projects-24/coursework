import { Typography } from "@mui/material";
import Image from "next/image";
import ClipLoader from "react-spinners/ClipLoader";

/**
 * @author Tom Whitticase
 *
 * @description User will be redirected to another page if on this page. Displays a loading animation
 *
 */

export default function Home() {
  return (
    <>
      <div className="relative w-screen h-screen flex items-center justify-center">
        <ClipLoader className="w-10 h-10" size={150} color="#eebe0e" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <Image
            src="/images/make-it-all.png"
            alt="Make-it-all Logo"
            width={40}
            height={40}
          />
          <Typography variant="subtitle1">Make-it-all</Typography>
        </div>
      </div>
    </>
  );
}
