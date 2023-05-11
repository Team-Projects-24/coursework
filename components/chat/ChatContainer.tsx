import { Box, DialogContent, DialogContentText } from "@mui/material";
import { IChatMessage } from "types/ChatMessage.d";
import MessageBubble from "./MessageBubble";
import { Message } from "@prisma/client";
import { useEffect, useRef } from "react";
import LoadingScreen from "./LoadingScreen";

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
}

export default function ChatContainer({
  messages,
  userId,
}: ChatContainerProps) {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      <div
        style={{ backgroundColor: "rgba(255, 255, 255, 0.7)" }}
        className="messages overflow-y:auto backgroundColour:rgba(255,255,255,0.7)"
      >
        {messages?.map(
          (message: Message) => (
            <MessageBubble
              key={message.id}
              message={message}
              sent={userId === message.senderId}
            />
          )

          // other people
        )}
        <div ref={messagesEndRef} />
      </div>
      <style jsx>{`
        .messages {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          overflow-y: auto;
          height: 100%;
          width: 100%;
        }
      `}</style>
    </>
  );
}
