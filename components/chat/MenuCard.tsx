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
import { IChatMessage } from "types/ChatMessage.d";
import DoneIcon from "@mui/icons-material/Done";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import GroupIcon from "@mui/icons-material/Group";
import { Message } from "@prisma/client";
import { difference } from "lodash";
import { IChatMenu } from "types/ChatMenu.d";

/**
 * @author Ade Osindero
 *
 * @param updatedAt - The last time the current chat was updated.
 * @returns A formatted string depiction of the last time the chat was updated.
 */
function getChatDate(updatedAt: Date) {
  const dateDifference = new Date().getDay() - updatedAt.getDay();

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
  lastMessage: IChatMessage | undefined,
  isPrivate: boolean,
  id: string
) {
  if (!lastMessage) {
    return (
      <Grid item xs={11}>
        <Typography className="menu-card-text">Start a conversation</Typography>
      </Grid>
    );
  }

  if (lastMessage.senderId === id) {
    return (
      <Grid item container xs={11}>
        <Grid item paddingRight={0.5}>
          <DoneIcon
            fontSize="small"
            className={`tick ${lastMessage.seenBy ? "active" : ""}`}
          />
        </Grid>
        <Grid item xs zeroMinWidth>
          <Typography className="menu-card-text" noWrap>
            {lastMessage.content}
          </Typography>
        </Grid>
      </Grid>
    );
  }
  return (
    <Grid item xs={11}>
      <Typography className="menu-card-text">
        {`${!isPrivate ? `${lastMessage.senderId}: ` : ""}${
          lastMessage.content
        }`}
      </Typography>
    </Grid>
  );
}

function getImage(isPrivate: boolean, image: string | null) {
  if (image) {
    return <></>;
  }

  return (
    <Grid item padding={2}>
      <Box padding={1} className="icon-container">
        {isPrivate ? (
          <PersonIcon className="icon" />
        ) : (
          <GroupIcon className="icon" />
        )}
      </Box>
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
export default function MenuCard({
  chatId,
  userId,
}: {
  chatId: number;
  userId: string;
}) {
  const [lastMessage, setLastMessage] = useState<IChatMessage>();
  const [chat, setChat] = useState<IChatMenu>();

  useEffect(() => {
    async function getData() {
      const { data: chat } = await axios.post("/api/chat/getAllChatInfo", {
        id: chatId,
      });
      setChat(chat as IChatMenu);
      console.log(chat.messages);

      const { data: lastMessage } = await axios.post(
        "/api/chat/getChatMessage",
        { id: chat.messages.at(-1)!.id }
      );
      setLastMessage(lastMessage as IChatMessage);
    }
    getData();
  }, []);

  if (!chat || (chat.private && !chat.messages.length)) {
    return <></>;
  }

  return (
    <>
      <Grid container className="menu-card" paddingX={2}>
        {getImage(chat.private, chat.chatImage)}
        <Grid item className="menu-card-right" xs={11}>
          <Grid container direction="column">
            <Grid
              item
              container
              xs={12}
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item xs="auto">
                <Typography color="#e9edef" fontSize={18}>
                  {chat.name}
                </Typography>
              </Grid>
              <Grid item xs="auto">
                <Typography fontSize={15} color="#8696a0">
                  {getChatDate(new Date(chat.updatedAt))}
                </Typography>
              </Grid>
            </Grid>
            <Grid item container justifyContent="space-between">
              {getChatLastMessage(lastMessage, chat.private, userId)}
              <Grid item className="dropdown" xs="auto">
                <KeyboardArrowDownIcon className="down-arrow" />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
