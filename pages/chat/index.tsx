import { useState, useEffect } from "react";
import ChatIcon from "@mui/icons-material/Chat";
import GroupsIcon from "@mui/icons-material/Groups";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Box, Grid } from "@mui/material";
import { ChatCard, ChatCardArgs } from "components/chat/menu/ChatCard";
import useUserStore from "stores/userStore";
import { useRouter } from "next/router";
import SearchContainer from "components/chat/menu/SearchContainer";
import axios from "axios";
import { Chatroom, User } from "@prisma/client";
import { io } from "socket.io-client";
import { IUser } from "types/User.d";


interface ChatContainerArgs {
  chatData: ChatCardArgs[],
  unreadChats: boolean,
  searchKey: string,
  userId: string,
}

function ChatContainer({ unreadChats, searchKey, chatData }: ChatContainerArgs) {
  chatData = chatData.filter(data => !data.isPrivate || data.lastMessage);

  if (!searchKey) {
    return (
      <Box maxHeight="80vh" overflow="auto">
        {chatData.map(data => <ChatCard {...data} />)}
      </Box>
    );
  }

  return (
    <Box maxHeight="80vh" overflow="auto">
      {chatData.filter(data => data.title.includes(searchKey))
        .map(data => <ChatCard {...data} />)}
    </Box>
  );
}

export default function Chat() {
  const [unreadChats, setUnreadChats] = useState<boolean>(false);
  const [chatData, setChatData] = useState<ChatCardArgs[]>([]);
  const [indicator, setIndicator] = useState<boolean>(false);
  const [searchKey, setSearchKey] = useState<string>("");
  const { user, setUser } = useUserStore();
  const [url, setUrl] = useState<string>("");
  const router = useRouter();

  const createGroup = () => router.push("/chat/create-group");
  const createChat = () => router.push("/chat/create-chat");

  const onSearch = (key: string) => setSearchKey(key);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.href);
    }
  }, []);

  useEffect(() => {
    var memory: ChatCardArgs[] = [];

    user!.chatrooms.forEach(async chat => {
      try {
        const { data: chat_ } = await axios.get(`/api/chat/${chat.id}`);
        
        const title = !chat_.private ? chat_.name : chat_.members
          .filter((participant: User) => participant.userId !== user?.userId)
          .at(0)
          .userId;

        var data: ChatCardArgs = {
          lastUpdated: new Date(chat_.updatedAt),
          isPrivate: chat_.private,
          image: chat_.chatImage,
          sentByUser: false,
          id: chat_.id,
          read: false,
          title,
        };

        if (0 < chat_.messages.length) {
          const lastId = chat_.messages.at(-1)?.id;
          const { data: message } = await axios
            .get(`/api/chat/message/${lastId}`);
          
          data = {
            ...data,
            read: message.seenBy.length === chat_.members.length,
            sentByUser: message.senderId === user?.userId,
            lastMessage: message.content as string,
            senderId: message.senderId,
          }
        }

        memory = [...memory, data];
        setChatData(memory);
      } catch (error) {
        console.error("Error fetching chat data:", error);
      }
    })
  }, [user]);

  useEffect(() => {
    const socket = io("http://localhost:3001");
    socket.on("receive-message", async (message: string) => {
      const { data } = await axios
        .post("/api/users/getUserInfo", { username: user!.name });

      setUser(data as IUser);
      console.log(user);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Box bgcolor="#111b21" height="100%">
      <Grid
        container
        justifyContent="center"
        paddingY={1.2}
        bgcolor="#202c33"
        columnSpacing={2}
        margin={0}
        width="100%">
        <Grid item>
          <Box
            sx={{
              borderRadius: 2,
              cursor: "pointer",
            }}
            className="icon-container"
            onClick={createChat}
            padding={1.1}
            color="#aebac1">
            <ChatIcon />
          </Box>
        </Grid>
        <Grid item>
          <Box
            sx={{
              borderRadius: 2,
              cursor: "pointer",
            }}
            className="icon-container"
            padding={1.1}
            onClick={createGroup}
            color="#aebac1">
            <GroupsIcon />
          </Box>
        </Grid>
      </Grid>
      <Grid
        container
        paddingY={1}
        justifyContent="center"
        paddingX={2}
        bgcolor="#111b21">
        <Grid item container xs>
          <SearchContainer hint="Search chats" searchResponse={onSearch} />
        </Grid>
        <Grid item paddingLeft={2} paddingTop={0.8} xs="auto">
          <Box
            sx={{
              backgroundColor: unreadChats ? "#00a884" : "inherit",
              cursor: "pointer",
            }}
            onClick={() => setUnreadChats(!unreadChats)}
            borderRadius={5}
            padding={0.6}
            color="#aebac1">
            <FilterListIcon />
          </Box>
        </Grid>
      </Grid>
      <ChatContainer
        unreadChats={unreadChats}
        searchKey={searchKey}
        chatData={chatData}
        userId={user!.userId} />
      <style>
        {`
          icon-container:active {
            background-color: "#374248";
          }
        `}
      </style>
    </Box>
  );
}