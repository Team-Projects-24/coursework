/**
 * @author Ade Osindero
 *
 * @description Implements react component which serves to display the
 * chat rooms of the current user, on the menu of the text chat subsytem.
 */

import { Grid, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import axios from "axios";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from '@mui/icons-material/Close';
import GroupIcon from "@mui/icons-material/Group";
import { useRouter } from "next/router";
import { Chatroom, SeenBy, User } from "@prisma/client";
import { Message } from "@prisma/client";
import { Animated } from "react-animated-css";


interface ChatCardArgs {
  chatId: number;
  userId: string;
}

/**
 * @author Ade Osindero
 *
 * @param updatedAt - The last time the current chat was updated.
 * @returns A formatted string depiction of the last time the chat was updated.
 */
function getChatDate(updatedAt: Date) {
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
 * @param lastMessage - Last message sent on the chat.
 * @param isPrivate - Boolean confirming if the current chat is private.
 * @param id - The id of the current user.
 * @returns A react component which formats the display of the last message sent in the chat.
 */
function getChatLastMessage(
  lastMessage:
    | (Message & {
        seenBy: SeenBy[];
      })
    | null,
  isPrivate: boolean,
  id: string
) {
  if (!lastMessage) {
    return (
      <Box>
        <Typography>Start a conversation</Typography>
      </Box>
    );
  }

  if (lastMessage.senderId === id) {
    return (
      <Grid item container>
        <Grid
          item
          paddingRight={0.5}
          color={lastMessage.seenBy ? "#53bdeb" : "inherit"}>
          <DoneIcon fontSize="small" />
        </Grid>
        <Grid item xs zeroMinWidth>
          <Typography noWrap>{lastMessage.content}</Typography>
        </Grid>
      </Grid>
    );
  }
  return (
    <Box>
      <Typography>
        {`${!isPrivate ? `${lastMessage.senderId}: ` : ""}${
          lastMessage.content
        }`}
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

/**
 * @author Ade Osindero
 *
 * @param chatId - The id of the chat being formatted into a card.
 * @param userId - The id of the current user.
 * @returns A react component (the card) detailing information of the chat.
 */
export default function ChatCard({ chatId, userId }: ChatCardArgs) {
  const [lastMessage, setLastMessage] = useState<
    (Message & { seenBy: SeenBy[] }) | null
  >(null);
  const [chat, setChat] = useState<
    | (Chatroom & {
        members: User[];
        messages: Message[];
      })
    | null
  >();
  const [hover, setHover] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    async function getData() {
      try {
        const chatResponse = await axios.get(`/api/chat/${chatId}`);

        setChat(chatResponse.data);

        if (chatResponse.data.messages.length) {
          const lastId = chatResponse.data.messages.at(-1)!.id;

          const messageResponse = await axios
            .get(`/api/chat/message/${lastId}`);

          setLastMessage(messageResponse.data);
        }
      } catch (error) {
        console.error("Error fetching chat data:", error);
      }
    }

    getData();
  }, [chatId]);

  if (!chat || chat.private && !chat.messages.length) { return <></>; }

  const chatTitle = chat.private
    ? chat.members.filter((member) => member.userId !== userId).pop()?.name ??
      `${chat.members.at(0)?.name} (You)`
    : chat.name;

  const enterChat = () => router.push(`/chat/${chat.id}`);

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
        {getImage(chat.private, chat.chatImage)}
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
                {chatTitle}
              </Typography>
            </Grid>
            <Grid item xs="auto">
              <Typography fontSize={15} color="#8696a0">
                {getChatDate(new Date(chat.updatedAt))}
              </Typography>
            </Grid>
          </Grid>
          <Grid item container justifyContent="space-between">
            <Grid item container onClick={enterChat} xs>
              {getChatLastMessage(lastMessage, chat.private, userId)}
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
