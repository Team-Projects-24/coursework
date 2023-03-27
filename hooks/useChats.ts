import { useState, useEffect } from "react";
import axios from "axios";
import { IChatroom } from "types/Chatroom.d";

export function useChat(id: number) {
  const [chat, setChat] = useState<IChatroom>();

  const f = async () => {
    const { data, status } = await axios.post("/api/chat/getChatInfo", {
       id,
    });
    setChat(data as IChatroom);
    return data;
  }
  console.log(f());
  // console.log(chat);
}
