interface MessageBubbleProps {
  content: string;
  userId: string;
  sent: boolean;
}
const MessageBubble: React.FC<MessageBubbleProps> = ({
  content,
  userId,
  sent,
}) => {
  const currentTime = new Date().toLocaleTimeString();
  return (
    <div>
      <div className={`speech-bubble ${sent ? "sent" : "received"}`}>
        <p>{content}</p>
        <span className="time">{currentTime}</span>
      </div>
    </div>
  );
};
export default MessageBubble;
