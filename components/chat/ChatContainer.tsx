import {
  Box,
  CardContent,
  DialogContent,
  DialogContentText,
  Grid,
  Typography,
} from "@mui/material";
import { IChatMessage } from "types/ChatMessage.d";
import MessageBubble from "./MessageBubble";
import { Message, SeenBy } from "@prisma/client";
import { useEffect, useRef } from "react";
import LoadingScreen from "./LoadingScreen";
import MessageSection from "./MessageSection";

/**
 * @author Ben Pritchard
 *
 * @desctiption The main body of the chatroom, containing messages which have been sent.
 * @param messages - The messages to display in the chat container.
 * @param userId - The id of the current user.
 * @returns A react component which displays the messages in the chat container.
 */

interface ChatContainerProps {
  messages: Message[];
  userId: string;
  isPrivate: boolean;
  chatSize: number;
}

function stringToColor(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xff;
    color += value.toString(16).padStart(2, "0");
  }

  return color;
}

function classifyDate(date: Date) {
  const dateDifference = Math.floor(
    (new Date().getTime() - date.getTime()) / 86400000
  );

  switch (dateDifference) {
    case 0:
      return "Today";
    case 1:
      return "Yesterday";
    default: {
      return date.toLocaleString("en-uk", {
        weekday: "short",
        day: "numeric",
        month: "short",
      });
    }
  }
}

export default function ChatContainer({
  messages,
  userId,
  isPrivate,
  chatSize,
}: ChatContainerProps) {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  let currentTime;

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <CardContent
      sx={{
        overflow: "auto",
        display: "flex",
        height: "calc(100% - 125px)",
      }}
    >
      <Grid container direction="row" display="block" margin={0}>
        {messages?.map(
          (
            message: Message & {
              seenBy: SeenBy[];
            }
          ) => {
            const time = new Date(message.updatedAt);

            const timeString = time.toLocaleString("en-uk", {
              timeStyle: "short",
            });

            const classification = classifyDate(time);

            if (classification !== currentTime) {
              currentTime = classification;

              return (
                <>
                  <Box
                    paddingY={5}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Typography
                      bgcolor="#182229"
                      paddingX="12px"
                      paddingY="5px"
                      color="#8696a0"
                      borderRadius="7.5px"
                    >
                      {classification}
                    </Typography>
                  </Box>
                  <MessageSection
                    senderID={message.senderId}
                    content={message.content}
                    sent={userId === message.senderId}
                    isPrivate={isPrivate}
                    idColour={stringToColor(message.senderId)}
                    time={timeString}
                    read={message.seenBy.length == chatSize}
                  />
                </>
              );
            }

            return (
              <MessageSection
                senderID={message.senderId}
                content={message.content}
                sent={userId === message.senderId}
                isPrivate={isPrivate}
                idColour={stringToColor(message.senderId)}
                time={timeString}
                read={message.seenBy.length == chatSize}
              />
              // <MessageBubble
              //   key={message.id}
              //   message={message}
              //   sent={userId === message.senderId}
              // />
            );
          }
        )}
        <div style={{ height: 10 }} ref={messagesEndRef} />
      </Grid>
    </CardContent>
  );
}
