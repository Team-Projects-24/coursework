// import ChatContainer from "../components/chat/ChatContainer";
import { useRouter } from "next/router";
import MessageContainer from "components/chat/MessageContainer";
import { useEffect, useState } from "react";
import { useChatroom } from "hooks/useChatroom";
import { IChatMessage } from "types/ChatMessage.d";
// import { Box, DialogContent, DialogContentText } from "@material-ui/core";
import useUserStore from "stores/userStore";
import { Box, Typography } from "@mui/material";
import InputBar from "components/chat/InputBar";
import ChatHeader from "components/chat/ChatHeader";
import { IChatroomInfo } from "types/Chatroom.d";
import axios from "axios";
import ChatContainer from "components/chat/ChatContainer";

// const message = "Hello World! page";

export default function ChatPage() {
  const router = useRouter();
  const { id } = router.query;
  const [url, setUrl] = useState<string>("");
  const chatroomId = parseInt(id as string);
  const user = useUserStore((state) => state.user);
  const [chatInfo, setChatInfo] = useState<IChatroomInfo>();
  const [messages, setMessages] = useState<IChatMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getMessages() {
      const { data } = await axios.post("/api/chat/getChatMessages", {
        id: chatroomId,
      });
      setMessages(data as IChatMessage[]);
      setLoading(false);
    }
    getMessages();
  }, [id]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.href);
    }
  }, []);

  useEffect(() => {
    async function getChat() {
      const { data } = await axios.post("/api/chat/getChatInfo", {
        id: chatroomId,
      });
      setChatInfo(data as IChatroomInfo);
    }
    getChat();
  }, [id]);

  console.log(chatInfo);

  const chatName = chatInfo?.private
    ? chatInfo.members.filter((member) => member.userId !== user?.userId).at(0)
        ?.name ?? user?.name
    : chatInfo?.name;

  const loadingMessage = "loading...";

  return (
    <div>
      <ChatHeader chatName={chatName!} chatImage="" chatId={chatroomId} />
      <ChatContainer messages={messages} userId={user?.userId as string} />
      <InputBar chatId={chatroomId} userId={user?.userId as string} />
    </div>
  );
}
