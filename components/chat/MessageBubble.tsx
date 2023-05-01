import { Message } from "@prisma/client";
import { IChatMessage } from "types/ChatMessage.d";

interface MessageBubbleProps {
  message: Message;
  sent: boolean;
}

function getChatDate(updatedAt: Date) {
  return updatedAt.toLocaleString("en-uk", {
    timeStyle: "medium",
    dateStyle: "short",
  });
}

export default function MessageBubble({ message, sent }: MessageBubbleProps) {
  //   const stringSentAt = message.sentAt.toLocaleTimeString();
  console.log(message.sentAt);
  return (
    <div>
      <div className={`speech-bubble ${sent ? "sent" : "received"}`}>
        <p>{message.content}</p>
        <span className="time">{getChatDate(new Date(message.sentAt))}</span>
      </div>
    </div>
  );
}
