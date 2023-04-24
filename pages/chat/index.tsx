import { useState, useEffect } from "react";
import ChatIcon from "@mui/icons-material/Chat";
import GroupsIcon from "@mui/icons-material/Groups";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Box, Grid } from "@mui/material";
import ChatCard from "components/chat/menu/ChatCard";
import useUserStore from "stores/userStore";
import { useRouter } from "next/router";

/**
 * @author Ade Osindero
 * 
 * @returns A component containinng the contents of the bottom portiion of the page.
 */

function BottomMenu() {
  const user = useUserStore((state) => state.user);
  var count = 0;

  return (
    <Grid
      container
      height="100%"
      direction="column"
      width="100%"
      className="second-colour"
    >
      <Grid
        item
        container
        margin={0}
        paddingY={1}
        justifyContent="center"
        id="top-bar"
        paddingX={2}
      >
        <Grid
          container
          item
          paddingY={1}
          borderRadius={2}
          className="primary-colour"
          xs
        >
          <Grid item paddingLeft={2} xs="auto">
            <SearchIcon className="icon" />
          </Grid>
          <Grid item paddingLeft={4} xs={11}>
            <input
              type="text"
              placeholder="Search or start new chat"
              className="primary-colour search"
            />
          </Grid>
        </Grid>
        <Grid item paddingLeft={2} paddingTop={0.8} xs="auto">
          <Box padding={0.3} className="icon-container">
            <FilterListIcon className="icon" />
          </Box>
        </Grid>
      </Grid>
      {user?.chatrooms.map((chat) => 
        <ChatCard key={count++} chatId={chat.id} userId={user.userId} />
      )}
    </Grid>
  );
}

export default function Chat() {
  const [url, setUrl] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.href);
    }
  }, []);

  return (
    <Box className="second-color" height="100%">
      <Grid
        container justifyContent="center" paddingY={1.2}
        className="primary-colour" columnSpacing={2} margin={0}
        width="100%"
      >
        <Grid item>
          <Box
            className="icon-container"
            onClick={() => {router.push("/chat/create-chat")}
            }
            padding={1.1}
          >
            <ChatIcon className="icon" />
          </Box>
        </Grid>
        <Grid item>
          <Box className="icon-container" padding={1.1}>
            <GroupsIcon className="icon" />
          </Box>
        </Grid>
      </Grid>
      <BottomMenu />
    </Box>
  );
}
