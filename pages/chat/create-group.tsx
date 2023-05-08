import { Box, Grid, Typography } from "@mui/material";
import useUserStore from "stores/userStore";
import { useState } from "react";
import { IUser } from "types/User.d";
import ProfileWrack from "components/chat/menu/ProfileWrack";
import { useRouter } from "next/router";
import ChatroomCreationHeader from "components/chat/menu/ChatroomCreationHeader";
import SearchContainer from "components/chat/menu/SearchContainer";
import ParticipantToken from "components/chat/menu/ParticipantToken";


interface LeftSectionArgs {
  participants: Array<IUser>,
  removeResponse: ((user: IUser) => void),
  userId: string,
}

interface RightSectionArgs {
  response: ((arg0: IUser) => void)
}

function LeftSection({ participants, removeResponse, userId }: LeftSectionArgs) {
  const [hover, setHover] = useState<boolean>(false);

  const createGroup = () => {

  };

  return (
    <Grid item container xs={6} padding={5} display="block">
      <Box bgcolor="#222e35" padding={3} borderRadius={3} height="700px">
        <Typography variant="h5" color="#d9dee0"><b>Details</b></Typography>
        <Grid
          container
          direction="column"
          paddingX={3}
          paddingTop={3}
          paddingBottom={5}
          rowSpacing={2}>
          <Grid item container direction="row">
              <input style={{
                  paddingBlock: "10px",
                  borderRadius: "10px",
                  paddingInline: "20px",
                  color: "#ffffff",
                  outline: "none",
                  width: "100%",
                }}
                placeholder="Name"
                className="second-colour" />
          </Grid>
          <Grid item container direction="row">
            <input style={{
                paddingBlock: "10px",
                borderRadius: "10px",
                paddingInline: "20px",
                color: "#ffffff",
                outline: "none",
                width: "100%",
              }}
              placeholder="Description"
              className="second-colour" />
          </Grid>
        </Grid>
        <Typography variant="h5" color="#d9dee0">
          <b>Participants</b>
        </Typography>
        <Box maxHeight="400px" marginY={2} paddingX={2} overflow="auto">
          {participants.map((user) =>
              <Box paddingBottom={1}>
                <ParticipantToken
                  user={user}
                  removeResponse={removeResponse}
                  allowRemoval={user.userId !== userId} />
              </Box>
            )
          }
        </Box>
      </Box>
      <Box justifyContent="center" display="flex" paddingTop={2}>
        <button style={{
            backgroundColor: hover ? "#06cf9c" : "#00a884",
            paddingInline: "30px",
            borderRadius: "20px",
            paddingBlock: "7px",
            fontWeight: "550",
            color: "#111b21",
          }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={createGroup}>
          Create chat
        </button>
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

export default function CreateGroup() {
  const { user, setUser } = useUserStore();
  const [participants, setParticipants ] = useState<Array<IUser>>([user!]);
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
          removeResponse={removeResponse}
          userId={user!.userId} />
        <RightSection response={response} />
      </Grid>
    </Box>
  );
}
