import { Button, Container, FormControl, Grid, TextField } from "@mui/material";
import { createElement, useState } from "react";
import { AiOutlinePaperClip, AiOutlineSend } from "react-icons/ai";
import { IconType } from "react-icons";
import axios from "axios";
import { IUser } from "types/User.d";
import useUserStore from "stores/userStore";
import router, { Router } from "next/router";

interface IInputBarProps {
  userId: string;
  chatId: Number;
}

export default function InputBar({ chatId, userId }: IInputBarProps) {
  const [message, setMessage] = useState<string>("");

  const updateMessage = (e: any) => {
    setMessage(e.target.value);
  };
  async function onSendMessage() {
    //api call in here to send message
    if (message === "") return;
    console.log(chatId, message, userId);
    await axios.post("/api/chat/sendMessage", {
      id: chatId,
      content: message,
      userId: userId,
    });
  }

  return (
    <FormControl>
      <Grid
        container
        className="input-bar"
        position="fixed"
        bottom={0}
        height={"7.5%"}
        padding={1}
        width={"90%"}
        border-top={1}
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        border={1}
      >
        <Grid width="5%" alignContent="center">
          <Button fullWidth>
            <AiOutlinePaperClip size={30} />
          </Button>
        </Grid>
        <Grid width="90%" alignContent={"center"}>
          <TextField
            id="message"
            onChange={updateMessage}
            variant="outlined"
            fullWidth
            size="small"
          />
        </Grid>
        <Grid width="5%" alignContent="center">
          <Button
            fullWidth
            onClick={onSendMessage}
            disabled={message ? false : true}
          >
            <AiOutlineSend size={30} />
          </Button>
        </Grid>
      </Grid>
    </FormControl>
  );
}
