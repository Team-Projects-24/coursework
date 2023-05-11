import { Grid, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { Box } from "@mui/system";
import { useState } from "react";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from '@mui/icons-material/Close';
import GroupIcon from "@mui/icons-material/Group";
import { useRouter } from "next/router";
import { Animated } from "react-animated-css";
import { cr } from "chart.js/dist/chunks/helpers.core";


export interface ChatCardArgs {
  lastMessage?: string,
  sentByUser: boolean,
  unreadCount: number,
  isPrivate: boolean,
  senderId?: string,
  lastUpdated: Date,
  image: string,
  title: string,
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
function formatMessage(message: string, isPrivate: boolean, senderId: string, sentByUser: boolean, read: boolean) {
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

export function ChatCard({ lastMessage, lastUpdated, image, title, senderId, sentByUser, unreadCount, id, isPrivate }: ChatCardArgs) {
  const [hover, setHover] = useState<boolean>(false);
  const [crossDisplay, setCrossDisplay] = useState<string>("none");
  const router = useRouter();

  const enterChat = () => router.push("/chat/".concat(id));

  const onHover = () => {
    setCrossDisplay("flex");
    setHover(true);
  }
  const onBlur = async () => {
    setHover(false);
    setCrossDisplay("none");
  }

  return (
    <Grid
      sx={{ cursor: "pointer", }}
      bgcolor={hover ? "#2a3942" : "inherit"}
      onMouseEnter={onHover}
      onMouseLeave={onBlur}
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
              <Typography
                fontSize={15}
                color={0 < unreadCount ? "#03a987" : "#8696a0"}>
                {formatDate(lastUpdated)}
              </Typography>
            </Grid>
          </Grid>
          <Grid item container justifyContent="space-between">
            <Grid item container onClick={enterChat} xs>
              {!lastMessage ? <Box>
                  <Typography>Start a conversation</Typography>
                </Box> : formatMessage(lastMessage,
                  isPrivate, senderId, sentByUser, unreadCount < 1)}
            </Grid>
            {unreadCount < 1 ? null :
              <Grid
                item
                bgcolor="#03a987"
                xs="auto"
                justifyContent="center"
                display="flex"
                borderRadius={10}>
                <Box
                  width={25}
                  display="flex"
                  alignItems="center"
                  justifyContent="center">
                  <Typography fontSize={15} color="#121b22" noWrap>
                    {unreadCount}
                  </Typography>
                </Box>
              </Grid>
            }
            <Grid
              item
              color="#8696a0"
              display={crossDisplay}
              paddingLeft={1}
              xs="auto">
              <Animated
                animationIn="fadeInRight"
                animationOut="fadeOutRight"
                animationInDuration={100}
                animationOutDuration={100}
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
