import { Grid, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/router";
import { Animated } from "react-animated-css";

interface ChatroomCreationHeaderArgs {
  title: string;
}

/**
 * @author Ade Osindero
 *
 * @param title - The message to be written on the header.
 * @returns A header to put atop pages involving chatroom creation.
 */
export default function ChatroomCreationHeader({
  title,
}: ChatroomCreationHeaderArgs) {
  const router = useRouter();

  return (
    <Grid paddingY={2} bgcolor="#202c33" paddingX={2} width="100%">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"
      />
      {/* @ts-ignore */}
      <Animated
        animationIn="slideInLeft"
        animationInDuration={200}
        isVisible={true}
      >
        <Grid container direction="row" columnSpacing={3}>
          <Grid
            item
            color="#d9dee0"
            display="flex"
            alignItems="center"
            xs="auto"
          >
            <ArrowBackIcon
              sx={{ cursor: "pointer" }}
              onClick={() => router.back()}
            />
          </Grid>
          <Grid item xs="auto">
            <Typography color="#d9dee0" variant="h6">
              {title}
            </Typography>
          </Grid>
        </Grid>
      </Animated>
    </Grid>
  );
}
