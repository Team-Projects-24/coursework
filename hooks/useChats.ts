import { useState, useEffect } from "react";
import axios from "axios";

export function useChat(id: string) {
  const [chat, setChat] = useState();
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(0);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await axios.post("/api/chats/getChat", { id });
        const { data } = response;
        setChat(data);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    }
    fetchData();
  }, [reload]);

  const reloadChat = () => setReload(reload + 1);

  return { chat, loading, reloadChat };
}
