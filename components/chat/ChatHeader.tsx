import { Avatar, Button, Grid, Link, Typography } from "@mui/material";
import axios from "axios";
import { resolveHref } from "next/dist/shared/lib/router/router";
import { useRouter } from "next/router";

interface ChatHeaderProps {
  chatImage: string;
  chatName: string;
  description: string;
  chatId: number;
}

export default function ChatHeader(props: ChatHeaderProps) {
  const router = useRouter();

  const handleClick = async () => {
    router.push(`/chat/${props.chatId}/info`);
  };

  return (
    <>
      <Grid
        container
        height={"7.5%"}
        flexDirection={"row"}
        alignItems={"center"}
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
          <Link href="#" onClick={handleClick}>
            <Avatar
              src={props.chatImage}
              alt={props.chatName}
              className={"avatar"}
            />
          </Link>
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

      <style>
        {`
        .avatar:hover {
          transform: scale(1.2);
        }`}
      </style>
    </>
  );
}
