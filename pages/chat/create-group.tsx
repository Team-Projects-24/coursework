import { Box, Grid, Typography } from "@mui/material";
import useUserStore from "stores/userStore";
import { useEffect, useState } from "react";
import { IUser } from "types/User.d";
import axios from "axios";
import UserCard from "components/chat/menu/UserCard";
import ProfileWrack from "components/chat/menu/ProfileWrack";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/router";
import { ICreateChatroom } from "types/Chatroom.d";
import ChatroomCreationHeader from "components/chat/menu/ChatroomCreationHeader";
import SearchContainer from "components/chat/menu/SearchContainer";
import ParticipantToken from "components/chat/menu/ParticipantToken";

interface LeftSectionArgs {
  participants: Array<IUser>,
  removeResponse: ((user: IUser) => void)
}

interface RightSectionArgs {
  response: ((arg0: IUser) => void)
}

function LeftSection({ participants, removeResponse }: LeftSectionArgs) {
  return (
    <Grid item container xs={6} padding={3} display="block">
      <Box>
        <Typography variant="h5" color="#d9dee0"><b>Details</b></Typography>
        <Grid container direction="column" marginLeft={5} paddingTop={3} paddingBottom={7} rowSpacing={2}>
          <Grid item container direction="row">
            <Grid item xs={1.7}>
              <Typography color="#e9edef">Name</Typography>
            </Grid>
            <Grid item xs>
              <input className="chatgroup-creation-input"></input>
            </Grid>
          </Grid>
          <Grid item container direction="row">
            <Grid item xs={1.7}>
              <Typography color="#e9edef">Description</Typography>
            </Grid>
            <Grid item xs>
              <input className="chatgroup-creation-input"></input>
            </Grid>
          </Grid>
        </Grid>
        <Typography variant="h5" color="#d9dee0"><b>Participants</b></Typography>
        <Box maxHeight="50vh" marginY={2} paddingX={2} overflow="auto">
          {participants.map((user) => {
            return (
              <Box paddingBottom={1}>
                <ParticipantToken user={user} removeResponse={removeResponse} />
              </Box>
            );
          })}
        </Box>
      </Box>
    </Grid>
  );
}

function RightSection({ response }: RightSectionArgs) {
  const [partialId, setPartialId] = useState<string>("");

  return (
    <Grid
      item
      container
      borderLeft={1}
      borderColor="#262f34"
      paddingTop={4}
      display="block"
      xs={6}>
      <Box paddingX="20px">
        <SearchContainer hint="Search users by id" />
      </Box>
      <Box maxHeight="75vh" overflow="auto" marginY={2}>
        <ProfileWrack partialId={partialId} response={response} />
      </Box>
    </Grid>
  );
}

export default function createGroup() {
  const { user, setUser } = useUserStore();
  const [participants, setParticipants ] = useState<Array<IUser>>([]);
  const router = useRouter();
  
  const removeResponse = (selectedUser: IUser) => {
    setParticipants(participants
      .filter((user) => user.userId != selectedUser.userId))
  };

  const response = (selectedUser: IUser) => {
    if (participants.includes(selectedUser) ||
      selectedUser.userId == user?.userId) {
      return;
    }

    setParticipants([...participants, selectedUser]);
  };

  return (
    <Box minHeight="100%" className="second-colour">
      <ChatroomCreationHeader title="New group" />
      <Grid container direction="row">
        <LeftSection
          participants={participants}
          removeResponse={removeResponse} />
        <RightSection response={response} />
      </Grid>
    </Box>
  );
}
