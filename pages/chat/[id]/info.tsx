import { FormControl, Grid, MenuItem } from "@mui/material";
import { Chatroom, User } from "@prisma/client";
import axios from "axios";
import Info from "components/chat/info/Info";
import Members from "components/chat/info/Members";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Message } from "react-hook-form";
import useUserStore from "stores/userStore";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import {Select} from "@mui/material";
import MembersList from "components/chat/info/Members";

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

  return (
    <>
      <Grid container direction="column">
        <Grid item alignContent={"center"} alignSelf={"center"} xs={12} md={8}>
          {/* <Info name={chatData?.name as string} description={chatData?.description as string} /> */}
          <Info name={"chatname"} chatImage={""} description={"description for a chat"} />
        </Grid>
        <Grid container direction="column" alignContent ={"center"} alignSelf={"center"} paddingTop={5}>
        
      </Grid>

        <Grid item
          alignContent={"center"}
          alignSelf={"center"}
          justifyContent={"center"}
          xs={12}
          md={4}> <Members members={chatData?.members as User[]} />
        </Grid>
        <Grid container direction ="row" justifyContent="center" paddingBottom={5} >
        <FormControl style={{minWidth:230}}>
        <Select value = {chatData?.members} >
          <MenuItem value={1}> 1</MenuItem>
          <MenuItem value={1}> 1</MenuItem>
          <MenuItem value={1}> 1</MenuItem>
        </Select>

        </FormControl>
        
        <Button variant="contained">Add</Button>

        
        </Grid>
      </Grid>
      <Grid container direction="column" alignContent ={"center"} alignSelf={"center"}>
        
        <Grid container direction ="row" justifyContent="center" >
        <TextField label ="Enter chat description" variant="outlined" />
        <Button variant="contained">Submit</Button>
        </Grid>
        
      </Grid>


      
    </>
  );
}
