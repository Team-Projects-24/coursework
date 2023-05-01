import { Avatar, Button, Grid, Link, Typography } from "@mui/material";
import axios from "axios";
import { resolveHref } from "next/dist/shared/lib/router/router";
import { useRouter } from "next/router";

/**
 * @author Ben Pritchard
 *
 * @description Implements react component which serves to display the header of the chat.
 * @param chatImage - The image of the chat.
 * @param chatName - The name of the chat.
 * @param chatId - The id of the chat.
 * @returns A react component (the header) which displays the name and image of the chat.
 */

interface ChatHeaderProps {
  chatImage: string;
  chatName: string;
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
        alignItems="center"
        paddingY={1.2}
        margin={0}
        className="primary-colour"
        position={"fixed"}
      >
        <Grid
          item
          xs={0.5}
          justifyContent="center"
          display="flex"
          justifyItems="center"
          alignContent="center"
          alignItems="center"
          paddingX={5}
        >
          <Link href="#" onClick={handleClick}>
            <Avatar
              src={props.chatImage}
              alt={props.chatName}
              className="avatar"
            />
          </Link>
        </Grid>
        <Grid
          item
          flex={4}
          xs={5.25}
          justifyContent="center"
          alignContent="center"
        >
          <Typography fontWeight="bold" fontSize={18} color="#e9edef">
            {props.chatName}
          </Typography>
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
