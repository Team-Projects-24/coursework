import { Grid, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { Box } from "@mui/system";
import { useState } from "react";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from '@mui/icons-material/Close';
import GroupIcon from "@mui/icons-material/Group";
import { useRouter } from "next/router";
import { Animated } from "react-animated-css";


export interface ChatCardArgs {
  lastMessage?: string,
  sentByUser: boolean,
  isPrivate: boolean,
  senderId?: string,
  lastUpdated: Date,
  image: string,
  title: string,
  read: boolean,
  id: string,
}

/**
 * @author Ade Osindero
 *
 * @param updatedAt - The last time the current chat was updated.
 * @returns A formatted string depiction of the last time the chat was updated.
 */
function formatDate(updatedAt: Date) {
  const dateDifference = Math
    .floor((new Date().getTime() - updatedAt.getTime())/86400000);

  if (dateDifference === 0) {
    return updatedAt.toLocaleString("en-uk", { timeStyle: "short" });
  } else if (dateDifference === 1) {
    return "Yesterday";
  } else if (dateDifference < 7) {
    return updatedAt.toLocaleString("en-uk", { weekday: "long" });
  } else {
    return updatedAt.toLocaleDateString("en-uk");
  }
}

/**
 * @author Ade Osindero
 *
 * @param message - The last message sent on the chat.
 * @param isPrivate - Boolean confirming if the current chat is private.
 * @param sentByUser - Boolean confirming whether or not the current user sent the message.
 * @param senderId - The id of the sender of the message.
 * @param read - Boolean confirming whether or not the message was read.
 * @returns A react component which formats the display of the last message sent in the chat.
 */
function formatMessage(message: string | undefined, isPrivate: boolean, senderId: string | undefined, sentByUser: boolean, read: boolean) {
  if (!message) {
    return (
      <Box>
        <Typography>Start a conversation</Typography>
      </Box>
    );
  }

  if (sentByUser) {
    return (
      <Grid item container>
        <Grid
          item
          paddingRight={0.5}
          color={read ? "#53bdeb" : "inherit"}>
          <DoneIcon fontSize="small" />
        </Grid>
        <Grid item xs zeroMinWidth>
          <Typography noWrap>{message}</Typography>
        </Grid>
      </Grid>
    );
  }

  return (
    <Box>
      <Typography>
        {`${!isPrivate ? `${senderId}: ` : ""}${message}`}
      </Typography>
    </Box>
  );
}

/**
 * @author Ade Osindero
 * 
 * @param isPrivate - Whether or not the chat is private.
 * @param image - The location of the image.
 * @returns A grid component having the chat image.
 */
function getImage(isPrivate: boolean, image: string | null) {
  // if (image) {
  //   return <></>;
  // }

  return (
    <Grid
      item
      padding={1.2}
      borderRadius={20}
      bgcolor="#00a884"
      color="#aebac1">
      {isPrivate ? <PersonIcon /> : <GroupIcon />}
    </Grid>
  );
}

export function ChatCard({ lastMessage, lastUpdated, image, title, senderId, sentByUser, read, id, isPrivate }: ChatCardArgs) {
  const [hover, setHover] = useState<boolean>(false);
  const router = useRouter();

  const enterChat = () => router.push(`/chat/${id}`);

  return (
    <Grid
      sx={{ cursor: "pointer", }}
      bgcolor={hover ? "#2a3942" : "inherit"}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      color={hover ? "#e9edef" : "#8696a0"}
      paddingRight={1}
      container>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css" />
      <Grid item container xs="auto" padding={2} onClick={enterChat}>
        {getImage(isPrivate, image)}
      </Grid>
      <Grid
        item
        container
        borderTop="solid 1.2px"
        borderColor="#222d34"
        alignItems="center"
        display="flex"
        xs>
        <Grid container direction="column" paddingRight={4}>
          <Grid
            item
            container
            justifyContent="space-between"
            alignItems="center"
            onClick={enterChat}>
            <Grid item xs="auto">
              <Typography color="#e9edef" fontSize={18}>
                {title}
              </Typography>
            </Grid>
            <Grid item xs="auto">
              <Typography fontSize={15} color="#8696a0">
                {formatDate(lastUpdated)}
              </Typography>
            </Grid>
          </Grid>
          <Grid item container justifyContent="space-between">
            <Grid item container onClick={enterChat} xs>
              {formatMessage(lastMessage,
                  isPrivate, senderId, sentByUser, read)}
            </Grid>
            <Grid
              item
              alignContent="center"
              color="#8696a0"
              xs="auto">
              <Animated
                animationIn="fadeInRight"
                animationOut="fadeOutRight"
                animationInDuration={400}
                animationOutDuration={400}
                isVisible={hover}>
                <CloseIcon />
              </Animated>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
