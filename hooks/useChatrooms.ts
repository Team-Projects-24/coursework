import { useEffect, useState } from "react";
import axios from "axios";
import { IChatMessage } from "types/ChatMessage.d";

export function useChatrooms(id?: number) {
  const [messages, setMessages] = useState();
  const [members, setMembers] = useState();
  const [loading, setLoading] = useState(true);
  // const [reload, setReload] = useState(0);
  const [sendingMessage, setSendingMessage] = useState(false);

  async function fetchData() {
    setLoading(true);
    if (id) {
      try {
        const response = await axios.post("/api/chat/getChatMessages", {
          id,
        });
        const { data } = response;
        setMessages(data);
      } catch (error) {
        console.error(error);
      }
    } else {
      //route back to previous page
    }
    setLoading(false);
  }
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(
    () => {
      async function fetchData() {
        setLoading(true);
        try {
          const response = await axios.get("/api/chat/getChatMessages");
          const { data } = response;
          setMessages(data);
        } catch (error) {
          console.error(error);
        }
        setLoading(false);
      }
      fetchData();
    },
    [
      /*reload*/
    ]
  );

  useEffect(
    () => {
      async function fetchData() {
        setLoading(true);
        try {
          const response = await axios.get("/api/chat/getChatMembers");
          const { data } = response;
          setMembers(data);
        } catch (error) {
          console.error(error);
        }
        setLoading(false);
      }
      fetchData();
    },
    [
      /*reload*/
    ]
  );

  // const reloadChatrooms = () => setReload(reload + 1);

  const sendMessage = async (message: IChatMessage) => {
    setSendingMessage(true);
    try {
      const response = await axios.post("/api/chat/sendMessage", {
        message,
      });
      const { data } = response;
      setMessages(data);
    } catch (error) {
      console.error(error);
    }
    setSendingMessage(false);
  };
  return { messages, members, loading, sendMessage /*reloadChatrooms*/ };
}
