import { Box, DialogContent, DialogContentText } from "@mui/material";
import { IChatMessage } from "types/ChatMessage.d";
import MessageBubble from "./MessageBubble";

interface ChatContainerProps {
  messages: IChatMessage[];
  userId: string;
}

export default function ChatContainer({
  messages,
  userId,
}: ChatContainerProps) {
  return (
    <div className="chat-container flex: 1 margin:20px">
      <div className="messages">
        {messages.map(
          (message) =>
            userId == message.sender.userId ? (
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