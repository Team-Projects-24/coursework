import { Box, Grid, Typography } from "@mui/material";
import useUserStore from "stores/userStore";
import { Dispatch, SetStateAction, useState } from "react";
import { IUser } from "types/User.d";
import ProfileWrack from "components/chat/menu/ProfileWrack";
import { useRouter } from "next/router";
import ChatroomCreationHeader from "components/chat/menu/ChatroomCreationHeader";
import SearchContainer from "components/chat/menu/SearchContainer";
import ParticipantToken from "components/chat/menu/ParticipantToken";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Animated } from "react-animated-css";
import { ICreateChatroom } from "types/Chatroom.d";
import axios from "axios";


interface LeftSectionArgs {
  participants: Array<IUser>,
  removeResponse: ((user: IUser) => void),
  userId: string,
  valid: boolean,
  setUser: (user: IUser | null) => void,
}

interface RightSectionArgs {
  response: ((arg0: IUser) => void),
}

/**
 * @author Ade Osindero
 * 
 * @param participants - An array of selected users for the group.
 * @param removeResponse - The function used to remove a user from the participants pool.
 * @param userId - The id of the sogned in user.
 * @param valid - An indication of whether or not the participants pool is valid.
 * @param setUser - The method used to set the signed in user.
 * @returns The left section of the CreateGroup page.
 */
function LeftSection({ participants, removeResponse, userId, valid, setUser }: LeftSectionArgs) {
  const [hover, setHover] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const router = useRouter();

  const createGroup = async () => {
    var chatDescription = description;
    var chatName = name;

    if (!name) {
      chatName = participants.map((user) => user.name).join(", ");
    }

    if (!description) {
      chatDescription = "A chat, that was not bothered to be described, between users.";
    }

    const newGroup: ICreateChatroom = {
      name: chatName,
      private: false,
      creatorId: userId,
      chatImage: "",
      members: participants.map((user) => user.userId),
      description: chatDescription,
    }
    const chat = await axios.post("/api/chat/", { room: newGroup });

    const { data } = await axios
      .post("/api/users/getUserInfo", { username: userId });
    setUser(data as IUser);
    
    router.back();
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
              <input
                style={{
                  backgroundColor: "#111b21",
                  paddingBlock: "10px",
                  borderRadius: "10px",
                  paddingInline: "20px",
                  color: "#ffffff",
                  outline: "none",
                  width: "100%",
                }}
                onChange={(e) => setName(e.currentTarget.value)}
                placeholder="Name" />
          </Grid>
          <Grid item container direction="row">
            <input
              style={{
                backgroundColor: "#111b21",
                paddingBlock: "10px",
                borderRadius: "10px",
                paddingInline: "20px",
                color: "#ffffff",
                outline: "none",
                width: "100%",
              }}
              onChange={(e) => setDescription(e.currentTarget.value)}
              placeholder="Description" />
          </Grid>
        </Grid>
        <Typography variant="h5" color="#d9dee0">
          <b>Participants</b>
        </Typography>
        <Box maxHeight="400px" marginY={2} paddingX={2} overflow="auto">
          {participants.map((user) =>
              <Box paddingBottom={1} key={user.userId}>
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
        <Animated
          animationIn="zoomIn"
          animationOut="zoomOut"
          animationInDuration={500}
          animationOutDuration={500}
          isVisible={valid}>
          <button
            style={{
              backgroundColor: hover ? "#06cf9c" : "#00a884",
              padding: 15,
              borderRadius: 30,
              color: "#e9edef",
              cursor: "pointer",
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={createGroup}>
            <ArrowForwardIcon />
          </button>
        </Animated>
      </Box>
    </Grid>
  );
}

/**
 * @author Ade Osindero
 * 
 * @param response - The function used to add users to the participants pool. 
 * @returns The right section of the CreateGroup page.
 */
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
        <ProfileWrack
          partialId={partialId}
          response={response} />
      </Box>
    </Grid>
  );
}

export default function CreateGroup() {
  const { user, setUser } = useUserStore();
  const [participants, setParticipants ] = useState<Array<IUser>>([user!]);
  const [valid, setValid] = useState<boolean>(false);

  const removeResponse = (selectedUser: IUser) => {
    setParticipants(participants
      .filter((user) => user.userId != selectedUser.userId));
    
    setValid(2 < participants.length);
  };

  const response = (selectedUser: IUser) => {
    if (participants.includes(selectedUser) ||
      selectedUser.userId == user?.userId) {
      return;
    }

    setParticipants([...participants, selectedUser]);

    setValid(true);
  };

  return (
    <Box minHeight="100%" bgcolor="#111b21">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css" />
      <ChatroomCreationHeader title="New group" />
      <Grid container direction="row">
        <LeftSection
          participants={participants}
          removeResponse={removeResponse}
          userId={user!.userId}
          valid={valid}
          setUser={setUser} />
        <RightSection response={response} />
      </Grid>
    </Box>
  );
}
