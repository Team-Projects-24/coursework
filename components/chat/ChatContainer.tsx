import {
  Box,
  CardContent,
  DialogContent,
  DialogContentText,
  Grid,
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

            console.log(message);

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
