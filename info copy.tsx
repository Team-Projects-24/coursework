import { FormControl, Grid, InputLabel, MenuItem } from "@mui/material";
import { Chatroom, User } from "@prisma/client";
import axios from "axios";
import Info from "components/chat/info/Info";
import Members from "components/chat/info/Members";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import { Message } from "react-hook-form";
import useUserStore from "stores/userStore";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { Select } from "@mui/material";
import MembersList from "components/chat/info/Members";
import { List } from "react-content-loader";
import LoadingScreen from "components/chat/LoadingScreen";

export default function InfoPage() {
  const router = useRouter();
  const { id } = router.query;
  const chatroomId = parseInt(id as string);
  const user = useUserStore((state) => state.user);
  const [chatData, setChatData] = useState<
    | (Chatroom & {
        members: User[];
        messages: Message[];
      })
    | null
  >(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [options, setOptions] = useState<User[]>([]);
  const [members, setMembers] = useState<User[]>([]);
  const [newMember, setNewMember] = useState("");
  const [removeMember, setRemoveMember] = useState("");

  var change = 0;

  useEffect(() => {
    const fetchOptions = async () => {
      const response = await axios.get("/api/users/getUsers");
      setOptions(response.data);
    };
    fetchOptions();
  }, []);

  useEffect(() => {
    if (chatData) {
      setMembers(chatData.members);
    }
  }, [chatData]);

  const handleClick = async () => {
    router.push("/chat/" + chatroomId);
  };

  const filteredUsers = options.filter(
    (option) => !members.some((member) => member.userId === option.userId)
  );

  async function getData() {
    setLoading(true);
    const { data } = await axios.get("/api/chat/" + chatroomId);
    setChatData(data);
    const response = await axios.get("/api/users/getUsers");
    setOptions(response.data);
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, [change]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.href);
    }
  }, []);

  const [url, setUrl] = useState<string>("");

  function updateMembersList() {
    const handleUpdateMembersList = async () => {
      const updatedList = chatData?.members?.map((person) => person.userId);
      updatedList?.push(newMember);
      try {
        const response = await axios.put("/api/chat/" + chatroomId, {
          name: chatData?.name,
          description: chatData?.description,
          chatImage: chatData?.chatImage,
          members: updatedList,
        });
      } catch (error) {
        console.log(error);
      }
    };

    handleUpdateMembersList();
    getData();
  }

  function removeMemberFromChat() {
    const handleRemoveMemberFromChat = async () => {
      const updatedChatList = chatData?.members?.map((person) => person.userId);
      const filteredList = updatedChatList?.filter(
        (userId) => userId !== removeMember
      );
      try {
        const response = await axios.put("/api/chat/" + chatroomId, {
          name: chatData?.name,
          description: chatData?.description,
          chatImage: chatData?.chatImage,
          members: filteredList,
        });
      } catch (error) {
        console.log(error);
      }
    };

    handleRemoveMemberFromChat();
    getData();
  }

  function updateChatName() {
    const handleUpdateChangeChatName = async () => {
      try {
        const response = await axios.put("/api/chat/" + chatroomId, {
          name: name as String,
          description: chatData?.description as String,
          chatImage: chatData?.chatImage as String,
          members: chatData?.members?.map((person) => person.userId),
        });
        setName("");
      } catch (error) {
        console.error(error);
      }
    };

    handleUpdateChangeChatName();
    getData();
  }

  function updateChatDesc() {
    const handleUpdateChatDesc = async () => {
      try {
        const response = await axios.put("/api/chat/" + chatroomId, {
          name: chatData?.name as String,
          description: description as String,
          chatImage: chatData?.chatImage as String,
          members: chatData?.members?.map((person) => person.userId),
        });
        setDescription("");
      } catch (error) {
        console.error(error);
      }
    };

    handleUpdateChatDesc();
    getData();
  }

  function clearingField() {
    const [inputValue, setInputValue] = useState("");

    const handleClearClick = () => {
      setInputValue("");
    };

    async function getUsers() {
      try {
        const response = await axios.get("/api/users/getUsers");
        const users = response.data;
        return users;
      } catch (error) {
        console.error(error);
      }
    }

    return (
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={handleClearClick}>Clear</button>
      </div>
    );
  }

  
  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <> {/* temp re-org file for the info page*/}
        <Grid container direction="column">

          {/* this lists the name of the chat and the description*/}
          <Grid item alignContent={"center"} alignSelf={"center"} xs={12} md={8}>
          <Info
                  name={chatData?.name as string}
                  description={chatData?.description as string}
                  chatImage={""}
                />
          </Grid>

          {/* this changes the name*/}
          <Grid item alignContent={"center"} alignSelf={"center"} xs={12} md={8}>
          <TextField id="proposedName" name="proposedName"
                label="Enter New Name" variant="outlined"
                type="text" value={name}
                onChange={(e) => setName(e.target.value)} />

            <Button type="submit" variant="contained" onClick={updateChatName}>
                Submit
              </Button>
          </Grid>

          {/* this changes the description*/}
          <Grid item alignContent={"center"} alignSelf={"center"} xs={12} md={8}>
          <TextField id="proposedDesc" name="proposedDesc"
                label="Enter chat description" variant="outlined"
                type="text" value={description}
                onChange={(e) => setDescription(e.target.value)}/>

              <Button type="submit" variant="contained" onClick={updateChatDesc}>
                Submit
              </Button>
          </Grid>

          {/* this lists the members*/}
          <Grid item alignContent={"center"} alignSelf={"center"} xs={12} md={4}>
            <Members members={chatData?.members as User[]} />
          </Grid>

          {/* this adds a members*/}
          <Grid item alignContent={"center"} alignSelf={"center"} xs={12} md={4}>
            <FormControl style={{ minWidth: 230 }}>
                <InputLabel id="newMem">Choose a member</InputLabel>
                <Select onChange={(e) => setNewMember(e.target.value as string)}
                  id="newMem" MenuProps={{
                    style: { maxHeight: 200, }, }} >

                  {filteredUsers.map((option) => (
                    <MenuItem key={option.userId} value={option.userId}>
                      {option.name}
                    </MenuItem>
                  ))}
                </Select>
            </FormControl>
            <Button variant="contained" onClick={updateMembersList}>Add</Button>
          </Grid>

          {/* this removes a member*/}
          <Grid item alignContent={"center"} alignSelf={"center"} xs={12} md={4}>
          <FormControl style={{ minWidth: 230 }}>
              <InputLabel id="removeMem">Choose a member</InputLabel>
              <Select onChange={(e) => setRemoveMember(e.target.value as string)}
                id="removeMem"
                MenuProps={{ style: { maxHeight: 200, }, }} >
                {members.map((option) => (
                  <MenuItem key={option.userId} value={option.userId}>
                    {option.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button variant="contained" onClick={removeMemberFromChat}> Remove </Button>
          </Grid>

          {/* button to back out of the info page*/}
          <Grid item alignContent={"center"} alignSelf={"center"} xs={12} md={4}>
          <Button variant="contained" onClick={handleClick}>Back</Button>
          </Grid>
          
        </Grid>{/* end of layout*/}
        </>
      )}
    </>
  );
}

