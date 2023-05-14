import { Box, Grid, Typography } from "@mui/material";
import useUserStore from "stores/userStore";
import { useState } from "react";
import { IUser } from "types/User.d";
import axios from "axios";
import ProfileWrack from "components/chat/menu/ProfileWrack";
import { useRouter } from "next/router";
import { ICreateChatroom } from "types/Chatroom.d";
import ChatroomCreationHeader from "components/chat/menu/ChatroomCreationHeader";
import SearchContainer from "components/chat/menu/SearchContainer";


export default function createChat() {
  const [partialId, setPartialId] = useState<string>("");
  const { user, setUser } = useUserStore();
  const router = useRouter();

  const response = async (selectedUser: IUser) => {
    let chat = user?.chatrooms
      .filter(
        (chatroom) =>
          chatroom.private && chatroom
            .members
            .map((member) => member.userId)
            .includes(selectedUser.userId)
      ).at(0);

    if (!chat) {
      const newRoom: ICreateChatroom = {
        name: `${user?.name}-${selectedUser.name}`,
        private: true,
        creatorId: user!.userId,
        chatImage: "",
        members: [user!.userId, selectedUser.userId],
        description: "Chat between users."
      };
      const { data: createdRoom } = await axios
        .post("/api/chat", { room: newRoom });

      chat = createdRoom;

      const { data: updatedUser } = await axios
        .post("/api/users/getUserInfo", { username: user?.userId });
      setUser(updatedUser as IUser);
    }

    router.push(`${chat?.id}`);
  }

  const searchById = (id: string) => setPartialId(id);

  return (
    <Box minHeight="100%" bgcolor="#111b21">
      <ChatroomCreationHeader title="New chat" />
      <Box>
        <Box paddingX={2} paddingTop={1}>
          <SearchContainer hint="Search user by id" searchResponse={searchById} />
        </Box>
        <Box maxHeight="80vh" overflow="auto" marginY={1}>
          <ProfileWrack partialId={partialId} response={response} />
        </Box>
      </Box>
    </Box>
  );
}
