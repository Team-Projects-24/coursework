import { Box, DialogContent, DialogContentText } from "@mui/material";
import { IChatMessage } from "types/ChatMessage.d";

interface ChatContainerProps {
  messages: IChatMessage[];
}

export default function ChatContainer({ messages }: ChatContainerProps) {
  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((message) => (
          <div key={message.id} className="message">
            <div className="sender-info">
              <strong>{message.sender.name}</strong>
              <span className="sent-at">
                {message.sentAt.toLocaleTimeString()}
              </span>
            </div>
            <div className="content">{message.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
