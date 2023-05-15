// import ChatContainer from "../components/chat/ChatContainer";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// import { Box, DialogContent, DialogContentText } from "@material-ui/core";
import useUserStore from "stores/userStore";
import { Card } from "@mui/material";
import InputBar from "components/chat/InputBar";
import ChatHeader from "components/chat/ChatHeader";
import axios from "axios";
import ChatContainer from "components/chat/ChatContainer";
import { Chatroom, Message, User } from "@prisma/client";
import { io, Socket } from "socket.io-client";
import LoadingScreen from "components/chat/LoadingScreen";

let socket: Socket;

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

  const getData = async () => {
    const { data } = await axios.get("/api/chat/" + chatroomId);
    setChatData(data);
    setLoading(false);

    let newRead = false;

    await data.messages.forEach(async (message) => {
      const { data } = await axios.post("/api/chat/seenby", {
        messageId: message.id,
        userId: user.userId,
      });

      newRead = data.created;
    }); // mark all chat messages as read.

    if (newRead) socket.emit("updated-chat", chatroomId);

    console.log(data.messages);
  };

  useEffect(() => {
    socket = io("http://34.175.26.133:4444");

    // socket.on("recieve-message", (chatID: number) => {
    //   if (chatID === chatroomId) getData();
    // });

    socket.on("update-chat", (chatID: number) => {
      if (chatID === chatroomId) {
        console.log("updating chat: " + chatID);
        getData();
      }
    });

    socket.emit("updated-chat", chatroomId);

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.href);
    }
  }, []);

  // console.log(chatData);

  const chatName = chatData?.private
    ? chatData.members.filter((member) => member.userId !== user?.userId).at(0)
        ?.name ?? user?.name
    : chatData?.name;

  const loadingMessage = "loading...";

  return loading ? (
    <LoadingScreen />
  ) : (
    <Card
      sx={{
        height: "100%",
        width: "100%",
        borderRadius: 0,
        maxHeight: "100%",
      }}
    >
      <ChatHeader
        chatName={chatName}
        chatId={chatData.id}
        isPrivate={chatData.private}
      />
      <ChatContainer
        messages={chatData?.messages as unknown as Message[]}
        userId={user?.userId as string}
        isPrivate={chatData.private}
        chatSize={chatData.members.length}
      />
      <InputBar chatId={chatroomId} userId={user?.userId as string} />
    </Card>
  );
}
