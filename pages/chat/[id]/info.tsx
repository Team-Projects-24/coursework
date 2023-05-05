import { FormControl, Grid, MenuItem } from "@mui/material";
import { Chatroom, User } from "@prisma/client";
import axios from "axios";
import Info from "components/chat/info/Info";
import Members from "components/chat/info/Members";
import { useRouter } from "next/router";
import { useState, useEffect,useRef } from "react";
import { Message } from "react-hook-form";
import useUserStore from "stores/userStore";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { Select } from "@mui/material";
import MembersList from "components/chat/info/Members";
import { List } from "react-content-loader";



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
  const [newMember, setNewMember] = useState("")
  const [sUId,ssUId] = useState('');

  useEffect(() => {
    const fetchOptions = async () => {
      const response = await axios.get("/api/users/getUsers");
      setOptions(response.data);
    };

    fetchOptions();
  }, []);

  useEffect(() =>{
    if(chatData){
      setMembers(chatData.members);
    }
  }, [chatData]);

  

  const filteredUsers = options.filter((option) => !members.some((member) => member.userId === option.userId));


  useEffect(() => {
    async function getData() {
      const { data } = await axios.get("/api/chat/" + chatroomId);
      setChatData(data);
      setLoading(false);
    }
    getData();
  }, [id]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.href);
    }
  }, []);

  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.href);
    }
  }, []);

  

  function ADname() {

    const handleUpdateA = async () => {
      const updatedList = chatData?.members?.map(((person) => person.userId));
      try{
        const response = await axios.put("/api/chat/" + chatroomId, {
          name : chatData?.name,
          description : chatData?.description,
          chatImage : chatData?.chatImage,
          members: updatedList
        });
        
      } catch (error) {
        //console.log(error)
      }
    }

    handleUpdateA();
  }

  function CRname() {

    const handleUpdateE = async () => {
      try {
        const response = await axios.put("/api/chat/" + chatroomId,
          {
            name: name as String,
            description: chatData?.description as String,
            chatImage: chatData?.chatImage as String,
            members: chatData?.members?.map((person) => (person.userId))
          });
        setName("");
      } catch (error) {
        console.error(error)
      }
    }

    handleUpdateE();
  };

  function CRdesc() {

    const handleUpdateD = async () => {
      try {
        const response = await axios.put("/api/chat/" + chatroomId,
          {
            name: chatData?.name as String,
            description: description as String,
            chatImage: chatData?.chatImage as String,
            members: chatData?.members?.map((person) => (person.userId))
          });
        setDescription("");
      } catch (error) {
        console.error(error)
      }
    }

    handleUpdateD();

  };

  function clearingField() {
    const [inputValue, setInputValue] = useState('');

    const handleClearClick = () => {
      setInputValue('');
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
        <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
        <button onClick={handleClearClick}>Clear</button>
      </div>
    );
  }


  return (
    <>
      <Grid container direction="column">
        <Grid item alignContent={"center"} alignSelf={"center"} xs={12} md={8}>
          {<Info name={chatData?.name as string} description={chatData?.description as string} chatImage={""}/>}
        </Grid>
        <Grid container direction="column" alignContent={"center"} alignSelf={"center"} paddingTop={5}>

        </Grid>

        <Grid item
          alignContent={"center"}
          alignSelf={"center"}
          justifyContent={"center"}
          xs={12}
          md={4}>
          <Members members={chatData?.members as User[]} />
        </Grid>

        <Grid container direction="row" justifyContent="center" paddingBottom={5} >
          <FormControl style={{ minWidth: 230 }}>
            <Select onChange={(e) => setNewMember(e.target.value as string)}
            id="newMem"
            MenuProps={{
              style:{
                maxHeight: 200,
              }
            }}>
              {filteredUsers.map((option) => (
                <MenuItem key={option.userId} value={option.userId}>
                  {option.name}
                </MenuItem>
              ))}


            </Select>


          </FormControl>

          <Button variant="contained" onClick={ADname}>Add</Button>


        </Grid>
      </Grid>


      <Grid container direction="column" alignContent={"center"} alignSelf={"center"}>
        <Grid container direction="row" justifyContent="center" >
          <TextField id="proposedDesc" name="proposedDesc" label="Enter chat description" variant="outlined" type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
          <Button type="submit" variant="contained" onClick={CRdesc}>Submit</Button>
        </Grid>


        <Grid container direction="row" justifyContent="center"  paddingTop={5}>
          <TextField id="proposedName" name="proposedName" label="Enter New Name" variant="outlined" type="text" value={name} onChange={(e) => setName(e.target.value)} />
          <Button type="submit" variant="contained" onClick={CRname}>Submit</Button>
        </Grid>

      </Grid>




    </>
  );
}
