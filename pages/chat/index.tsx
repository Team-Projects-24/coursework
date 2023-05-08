import { useState, useEffect } from "react";
import ChatIcon from "@mui/icons-material/Chat";
import GroupsIcon from "@mui/icons-material/Groups";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Box, Grid } from "@mui/material";
import ChatCard from "components/chat/menu/ChatCard";
import useUserStore from "stores/userStore";
import { useRouter } from "next/router";
import SearchContainer from "components/chat/menu/SearchContainer";


export default function Chat() {
  const [url, setUrl] = useState<string>("");
  const user = useUserStore((state) => state.user);
  const router = useRouter();

  var count = 0;

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.href);
    }
  }, []);

  return (
    <Box className="second-colour" height="100%">
      <Grid
        container
        justifyContent="center"
        paddingY={1.2}
        className="primary-colour"
        columnSpacing={2}
        margin={0}
        width="100%">
        <Grid item>
          <Box
            className="icon-container"
            onClick={() => router.push("/chat/create-chat")}
            padding={1.1}>
            <ChatIcon className="icon" />
          </Box>
        </Grid>
        <Grid item>
          <Box
            className="icon-container"
            padding={1.1}
            onClick={() => router.push("/chat/create-group")}>
            <GroupsIcon className="icon" />
          </Box>
        </Grid>
      </Grid>
      <Grid
        container
        margin={0}
        paddingY={1}
        justifyContent="center"
        id="top-bar"
        paddingX={2}
        className="second-colour">
        <Grid item container xs>
          <SearchContainer hint="Search chats" />
        </Grid>
        <Grid item paddingLeft={2} paddingTop={0.8} xs="auto">
          <Box padding={0.3} className="icon-container">
            <FilterListIcon className="icon" />
          </Box>
        </Grid>
      </Grid>
      <Box maxHeight="80vh" overflow="auto">
        {user?.chatrooms.map((chat) => (
          <ChatCard key={count++} chatId={chat.id} userId={user.userId} />
        ))}
      </Box>
    </Box>
  );
}
