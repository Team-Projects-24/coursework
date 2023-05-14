import { CardActionArea, Grid } from "@mui/material";
import axios from "axios";
import { ICreateChatMessage } from "types/ChatMessage.d";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import SendIcon from "@mui/icons-material/Send";

let socket: Socket;

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

  useEffect(() => {
    socket = io("http://34.175.26.133:4444");

    // socket.on("receive-message", (message: string) => {
    //   console.log(message);
    // });

    return () => {
      socket.disconnect();
    };
  }, []);

  const updateMessage = (e: any) => setMessage(e.target.value);

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

      const { data } = await axios.post("/api/chat/message/", newMessage);

      await axios.post("/api/chat/seenby", {
        messageId: data.id,
        userId: userId,
      }); // mark as read for the sender

      // socket.emit("send-message", chatId);
      socket.emit("updated-chat", chatId);

      setMessage("");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <CardActionArea
      sx={{
        boxShadow: "0px -10px 10px rgba(0, 0, 0, 0.2)",
        width: "-webkit-fill-available",
        position: "absolute",
        paddingTop: 1.2,
        paddingBottom: 1.2,
        left: `10rem`,
        bottom: 0,
        cursor: "default",
      }}
      style={{ backgroundColor: "#202c33" }}
      disableRipple
    >
      <Grid container direction="row" paddingX={5} columnGap={2}>
        <Grid
          item
          xs="auto"
          display="flex"
          marginBottom={1}
          alignItems="flex-end"
          color="#aebac1"
        >
          <AttachFileOutlinedIcon />
        </Grid>
        <Grid item display="flex" xs>
          <input
            style={{
              backgroundColor: "#2a3942",
              outline: "none",
              paddingInline: 20,
              paddingBlock: 10,
              borderRadius: 10,
              width: "100%",
              color: "#aebac1",
            }}
            value={message}
            onInput={updateMessage}
            onKeyPress={(e) => {
              if (e.key === "Enter") onSendMessage();
            }}
            placeholder="Type a message"
          />
        </Grid>
        <Grid
          item
          style={{ cursor: "pointer" }}
          xs="auto"
          display="flex"
          marginBottom={1}
          alignItems="flex-end"
          color="#aebac1"
          onClick={onSendMessage}
        >
          <SendIcon />
        </Grid>
      </Grid>
    </CardActionArea>

    // <Grid
    //   item
    //   container
    //   margin={0}
    //   paddingY={1}
    //   justifyContent="center"
    //   alignContent="center"
    //   paddingX={2}
    //   position="fixed"
    //   bgcolor="#202c33"
    //   id="input-bar">
    //   <Grid
    //     container
    //     item
    //     alignContent="center"
    //     paddingY={1}
    //     borderRadius={2}
    //     xs
    //     justifyContent="center">
    //     <Grid item xs="auto">
    //       <Button fullWidth>
    //         <AiOutlinePaperClip size={30} />
    //       </Button>
    //     </Grid>
    //     <Grid item xs={9}>
    //       <TextField
    //         id="message"
    //         onChange={updateMessage}
    //         onKeyPress={(e) => {
    //           if (e.key === "Enter") onSendMessage();
    //         }}
    //         variant="outlined"
    //         value={message}
    //         fullWidth
    //         size="small"
    //       />
    //     </Grid>

    //     <Grid item xs="auto" alignContent="center">
    //       <Button
    //         fullWidth
    //         onClick={onSendMessage}
    //         disabled={message ? false : true}
    //       >
    //         <AiOutlineSend size={30} />
    //       </Button>
    //     </Grid>
    //   </Grid>
    // </Grid>
  );
}
