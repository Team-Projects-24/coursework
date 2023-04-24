import { useState, useEffect } from "react";
import ChatIcon from "@mui/icons-material/Chat";
import GroupsIcon from "@mui/icons-material/Groups";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Box, Grid, Typography } from "@mui/material";
import MenuCard from "components/chat/MenuCard";
import useUserStore from "stores/userStore";
import { Chatroom } from "@prisma/client";
import MessageContainer from "components/chat/MessageContainer";
import MessageBubble from "components/chat/MessageBubble";

function BottomMenu() {
  const user = useUserStore((state) => state.user);
  var count = 0;
  return (
    <>
      <Grid
        container
        height={"100%"}
        className="second-colour"
        direction={"column"}
      >
        <Grid
          item
          container
          margin={0}
          paddingY={1}
          justifyContent={"center"}
          id="top-bar"
        >
          <Grid
            container
            item
            paddingY={1}
            borderRadius={3}
            className="main-colour"
            xs={11}
          >
            <Grid item paddingLeft={2} xs="auto">
              <SearchIcon className="icon" />
            </Grid>
            <Grid item paddingLeft={4} xs={11}>
              <input
                type="search"
                id="chat-search"
                placeholder="Search or start new chat"
                className="main-colour"
              />
            </Grid>
          </Grid>
          <Grid item paddingLeft={2} paddingTop={0.8}>
            <Box padding={0.3} className="icon-container">
              <FilterListIcon className="icon" />
            </Box>
          </Grid>
        </Grid>
        {user?.chatrooms.map((chat: Chatroom) => (
          <MenuCard key={count++} chatId={chat.id} userId={user.userId} />
        ))}            
      </Grid>
    </>
  );
}

export default function Chat() {
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.href);
    }
  }, []);

  return (
    <>
      <nav className="main-colour">
        <Grid container justifyContent="center" spacing={2}>
          <Grid item>
            <div className="icon-container">
              <ChatIcon className="icon" />
            </div>
          </Grid>
          <Grid item>
            <div className="icon-container">
              <GroupsIcon className="icon" />
            </div>
          </Grid>
        </Grid>
      </nav>

      <BottomMenu/>
    </>
    
  );
}
