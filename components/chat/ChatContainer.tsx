import { Box, DialogContent, DialogContentText } from "@mui/material";
import { IChatMessage } from "types/ChatMessage.d";
import MessageBubble from "./MessageBubble";
import { Message } from "@prisma/client";

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
  return (
    <div className="chat-container flex: 1 margin:20px height=90vh">
      <div className="messages">
        {messages?.map(
          (message: Message) =>
            userId == message.senderId ? (
              <MessageBubble message={message} sent={true} />
            ) : (
              <MessageBubble message={message} sent={false} />
            )
          // other people
        )}
      </div>
    </div>
  );
}

// <div key={message.id} className="message">
//   <div className="sender-info">
//     <strong>{message.sender.name}</strong>
//     <span className="sent-at">
//       {message.sentAt.toLocaleTimeString()}
//     </span>
//   </div>
//   <div className="content">{message.content}</div>
//   </div>
