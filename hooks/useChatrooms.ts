import { useEffect, useState } from "react";
import axios from "axios";

export function useChatrooms() {
  const [messages, setMessages] = useState();
  const [members, setMembers] = useState();
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(0);

  useEffect(() => {
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
  }, [reload]);

  useEffect(() => {
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
  }, [reload]);

  const reloadChatrooms = () => setReload(reload + 1);

  return { messages, loading, reloadChatrooms };
}
