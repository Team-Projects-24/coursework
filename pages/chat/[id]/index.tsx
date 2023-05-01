// import ChatContainer from "../components/chat/ChatContainer";
import { useRouter } from "next/router";
import MessageContainer from "components/chat/MessageContainer";
import { useEffect, useState } from "react";
import { useChatroom } from "hooks/useChatroom";
import { IChatMessage } from "types/ChatMessage.d";
// import { Box, DialogContent, DialogContentText } from "@material-ui/core";
import useUserStore from "stores/userStore";
import { Box, Grid, Typography } from "@mui/material";
import InputBar from "components/chat/InputBar";
import ChatHeader from "components/chat/ChatHeader";
import { IChatroomInfo } from "types/Chatroom.d";
import axios from "axios";
import ChatContainer from "components/chat/ChatContainer";
import { Chatroom, Message, User } from "@prisma/client";

// const message = "Hello World! page";

export default function ChatPage() {
  const router = useRouter();
  const { id } = router.query;
  const [url, setUrl] = useState<string>("");
  const chatroomId = parseInt(id as string);
  const user = useUserStore((state) => state.user);
  // const [chatInfo, setChatInfo] = useState<IChatroomInfo>();
  // const [messages, setMessages] = useState<IChatMessage[]>([]);
  const [chatData, setChatData] = useState<
    | (Chatroom & {
        members: User[];
        messages: Message[];
      })
    | null
  >();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getData() {
      console.log("/api/chat/" + chatroomId);
      const { data } = await axios.get("/api/chat/" + chatroomId);
      setChatData(data);
      setLoading(false);
    }
    getData();
  }, [id]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.href);
    }
  }, []);

  console.log(chatData);

  const chatName = chatData?.private
    ? chatData.members.filter((member) => member.userId !== user?.userId).at(0)
        ?.name ?? user?.name
    : chatData?.name;

  const loadingMessage = "loading...";

  return (
    <Grid container direction="column" height="100%" width="100%">
      <Grid item container height="7.5%" zIndex={1}>
        <ChatHeader chatName={chatName!} chatImage="" chatId={chatroomId} />
      </Grid>
      <Grid item container height="85%" zIndex={0}>
        <ChatContainer
          messages={chatData?.messages as unknown as Message[]}
          userId={user?.userId as string}
        />
      </Grid>
      <Grid item container height="7.5%" zIndex={1}>
        <InputBar chatId={chatroomId} userId={user?.userId as string} />
      </Grid>
    </Grid>
  );
}
