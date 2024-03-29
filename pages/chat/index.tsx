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
  chatData: ChatCardArgs[];
  unreadChats: boolean;
  searchKey: string;
  userId: string;
}

function ChatContainer({
  unreadChats,
  searchKey,
  chatData,
}: ChatContainerArgs) {
  chatData = chatData.filter(
    (data) =>
      (!data.isPrivate || data.lastMessage) &&
      (!unreadChats || 0 < data.unreadCount)
  );

  chatData.sort((a, b) => b.lastUpdated.getTime() - a.lastUpdated.getTime());

  if (!searchKey) {
    return (
      <Box maxHeight="80vh" overflow="auto">
        {chatData.map((data) => (
          <ChatCard {...data} />
        ))}
      </Box>
    );
  }

  return (
    <Box maxHeight="80vh" overflow="auto">
      {chatData
        .filter((data) =>
          data.title.toLowerCase().startsWith(searchKey.toLowerCase())
        )
        .map((data) => (
          <ChatCard {...data} />
        ))}
    </Box>
  );
}

export default function Chat() {
  const [unreadChats, setUnreadChats] = useState<boolean>(false);
  const [chatData, setChatData] = useState<ChatCardArgs[]>([]);
  const [searchKey, setSearchKey] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const { user, setUser } = useUserStore();
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

    user!.chatrooms.forEach(async (chat) => {
      try {
        const { data: chat_ } = await axios.get(`/api/chat/${chat.id}`);

        const title = !chat_.private
          ? chat_.name
          : chat_.members
              .filter(
                (participant: User) => participant.userId !== user?.userId
              )
              .at(0).userId;

        const unreadCount = chat_.messages.filter((message) =>
          message.seenBy.every((seenBy) => seenBy.userId !== user?.userId)
        ).length;

        var data: ChatCardArgs = {
          lastUpdated: new Date(chat_.createdAt),
          isPrivate: chat_.private,
          image: chat_.chatImage,
          sentByUser: false,
          id: chat_.id,
          unreadCount,
          read: false,
          title,
        };

        if (0 < chat_.messages.length) {
          const lastId = chat_.messages.at(-1)?.id;
          const { data: message } = await axios.get(
            `/api/chat/message/${lastId}`
          );

          data = {
            ...data,
            read: message.seenBy.length === chat_.members.length,
            sentByUser: message.senderId === user?.userId,
            lastMessage: message.content as string,
            lastUpdated: new Date(message.sentAt),
            senderId: message.senderId,
          };
        }

        memory = [...memory, data];
        setChatData(memory);
      } catch (error) {
        console.error("Error fetching chat data:", error);
      }
    });
  }, [user]);

  useEffect(() => {
    const socket = io("http://34.175.26.133:4444");

    socket.on("update-chat", async (chatID: string) => {
      const { data } = await axios.post("/api/users/getUserInfo", {
        username: user!.name,
      });

      const chatIDs: string[] = data.chatrooms.map((chat) => chat.id);

      if (chatIDs.includes(chatID)) setUser(data as IUser);
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
        width="100%"
      >
        <Grid item>
          <Box
            sx={{
              borderRadius: 5,
              cursor: "pointer",
              ":active": {
                backgroundColor: "#374248",
              },
            }}
            onClick={createChat}
            padding={1.1}
            color="#aebac1"
          >
            <ChatIcon />
          </Box>
        </Grid>
        <Grid item>
          <Box
            sx={{
              borderRadius: 5,
              cursor: "pointer",
              ":active": {
                backgroundColor: "#374248",
              },
            }}
            padding={1.1}
            onClick={createGroup}
            color="#aebac1"
          >
            <GroupsIcon />
          </Box>
        </Grid>
      </Grid>
      <Grid
        container
        paddingY={1}
        justifyContent="center"
        paddingX={2}
        bgcolor="#111b21"
      >
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
            color="#aebac1"
          >
            <FilterListIcon />
          </Box>
        </Grid>
      </Grid>
      <ChatContainer
        unreadChats={unreadChats}
        searchKey={searchKey}
        chatData={chatData}
        userId={user?.userId}
      />
    </Box>
  );
}
