import { Avatar } from "@mui/material";
import axios from "axios";

interface ChatHeaderProps {
  chatImage: string;
  chatName: string;
  description: string;
}

export default function ChatHeader(props: ChatHeaderProps) {
  return (
    <div className="chat-header">
      <div className="chat-header__left">
        <div className="chat-header__left__avatar">
          <Avatar src={props.chatImage} alt={props.chatName} />
        </div>
        <div className="chat-header__left__details">
          <h3>{props.chatName}</h3>
          <p>{props.description}</p>
        </div>
      </div>
      <div className="chat-header__right">
        <button>
          <i className="fas fa-ellipsis-v"></i>
        </button>
      </div>
    </div>
  );
}
