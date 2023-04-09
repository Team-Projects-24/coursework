import { Avatar, Button, Grid, Typography } from "@mui/material";
import axios from "axios";

interface ChatHeaderProps {
  chatImage: string;
  chatName: string;
  description: string;
}

export default function ChatHeader(props: ChatHeaderProps) {
  return (
    <>
      <Grid
        container
        spacing={1}
        height={"7.5%"}
        flexDirection={"row"}
        alignItems={"center"}
        padding={2}
        borderBottom={2}
        position={"fixed"}
      >
        <Grid
          item
          xs={0.5}
          justifyContent={"center"}
          display={"flex"}
          justifyItems={"center"}
          alignContent={"center"}
          alignItems={"center"}
          padding={1}
        >
          <Avatar src={props.chatImage} alt={props.chatName} />
        </Grid>
        <Grid
          item
          flex={4}
          xs={5.25}
          justifyContent={"center"}
          alignContent={"center"}
          padding={1}
        >
          <Typography>{props.chatName}</Typography>
        </Grid>
        <Grid
          item
          flex={4}
          xs={5.25}
          justifyContent={"center"}
          alignContent={"center"}
          padding={1}
        >
          <Typography>{props.description}</Typography>
        </Grid>
      </Grid>
    </>
  );
}
