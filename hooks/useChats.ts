import { useState, useEffect } from "react";
import axios from "axios";
import { IChatroom } from "types/Chatroom.d";

export default function useChat(id: number) {
  const [chat, setChat] = useState<IChatroom>();

  useEffect(() => {
    const fetchChatData = async () => {
      console.log(99);
      try {
        const res = await axios.post("/api/chat/getChatInfo", {
          id,
        });
        if (res.status === 200) {
          const { data } = res;
          setChat(data as IChatroom);
        } else {
          throw new Error("Unable to set user.");
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchChatData();
  });

  console.log(chat);
  return chat;
}
