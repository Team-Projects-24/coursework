// import ChatContainer from "../components/chat/ChatContainer";
import { useRouter } from "next/router";
import MessageContainer from "components/chat/MessageContainer";
import { useEffect, useState } from "react";
import { useChatroom } from "hooks/useChatroom";
import { IChatMessage } from "types/ChatMessage.d";
// import { Box, DialogContent, DialogContentText } from "@material-ui/core";
import useUserStore from "stores/userStore";
import { Typography } from "@mui/material";
import InputBar from "components/chat/InputBar";
import ChatHeader from "components/chat/ChatHeader";

// const message = "Hello World! page";

export default function ChatPage() {
  const router = useRouter();
  const { id } = router.query;
  const [url, setUrl] = useState<string>("");
  const chatroomId = parseInt(id as string);
  const user = useUserStore((state) => state.user);
  // const user = localStorage.getItem("username");

  const { loading, messages, members, sendMessage } = useChatroom(chatroomId);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.href);
    }
  }, []);

  const loadingMessage = "loading...";

  return (
    //       {loading ? <Typography>loadingMessage</Typography> : <div></div>}
    //       {
    //         <p> No messages in this chat</p>
    // }
    //       { messages.map((message: IChatMessage) => (
    //         <MessageContainer {message} />
    //       ))

    // }
    <>
      <ChatHeader
        chatName={"Name"}
        chatImage={""}
        description={"This is a description"}
        chatId={chatroomId}
      />
      <InputBar chatId={chatroomId} userId={user?.userId as string} />
    </>
  );
}

function onSendMessage(message: string) {
  //api call in here to send message
}
