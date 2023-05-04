import { Grid, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/router";

/**
 * @author Ade Osindero
 * 
 * @param title - The message to be written on the header.
 * @returns A header to put atop pages involving chatroom creation.
 */

interface ChatroomCreationHeaderArgs {
  title: string
}

export default function ChatroomCreationHeader({ title }: ChatroomCreationHeaderArgs) {
  const router = useRouter();

  return (
    <Grid
        container
        paddingY={2}
        columnSpacing={3}
        className="primary-colour"
        margin={0}
        width="100%">
        <Grid
          item
          color="#d9dee0"
          display="flex"
          alignItems="center"
          xs="auto"
          padding={0}>
          <ArrowBackIcon
            className="arrowBack"
            onClick={() => router.back()} />
        </Grid>
        <Grid item xs="auto">
          <Typography color="#d9dee0" variant="h6">{title}</Typography>
        </Grid>
      </Grid>
  );
}