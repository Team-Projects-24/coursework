import { Button, Container, FormControl, Grid, TextField } from "@mui/material";
import { createElement, useState } from "react";
import { AiOutlinePaperClip, AiOutlineSend } from "react-icons/ai";
import { IconType } from "react-icons";
import axios from "axios";
import { IUser } from "types/User.d";
import useUserStore from "stores/userStore";
import router, { Router } from "next/router";
import { ICreateChatMessage } from "types/ChatMessage.d";

/**
 * @author Ben Pritchard
 *
 * @description Implements a react component which serves as the input bar for the chatroom.
 * @param chatId - The id of the current chatroom.
 * @param userId - The id of the current user.
 * @returns A react component (the input bar) which allows the user to send messages.
 * @todo Implement the ability to send images and files.
 *
 */

interface IInputBarProps {
  userId: string;
  chatId: number;
}
export default function InputBar({ chatId, userId }: IInputBarProps) {
  const [message, setMessage] = useState<string>("");

  const updateMessage = (e: any) => {
    setMessage(e.target.value);
  };
  async function onSendMessage() {
    //api call in here to send message
    if (message === "") return;
    // console.log(chatId, message, userId);
    try {
      const newMessage: ICreateChatMessage = {
        content: message,
        senderId: userId,
        chatroomId: chatId,
      };
      console.log(newMessage);

      await axios.post("/api/chat/message/", newMessage);
      setMessage("");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Grid
      item
      container
      margin={0}
      paddingY={1}
      justifyContent={"center"}
      alignContent={"center"}
      paddingX={2}

      id="input-bar"
    >
      <Grid
        container
        item
        alignContent={"center"}
        paddingY={1}
        borderRadius={2}
        xs
        justifyContent={"center"}
      >
        <Grid item xs="auto">
          <Button fullWidth>
            <AiOutlinePaperClip size={30} />
          </Button>
        </Grid>
        <Grid item xs={9}>
          <TextField
            id="message"
            onChange={updateMessage}
            onKeyPress={(e) => {
              if (e.key === "Enter") onSendMessage();
            }}
            variant="outlined"
            value={message}
            fullWidth
            size="small"
          />
        </Grid>

          <Button
            fullWidth
            onClick={onSendMessage}
            disabled={message ? false : true}
          >
            <AiOutlineSend size={30} />
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
