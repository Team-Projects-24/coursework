import { useState, useEffect } from "react";
import axios from "axios";

export function useDocument(id: string) {
  const [document, setDocument] = useState();
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(0);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await axios.post("/api/documents/getDocument", { id });
        const { data } = response;
        setDocument(data);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    }
    fetchData();
  }, [reload]);

  const reloadDocument = () => setReload(reload + 1);

  return { document, loading, reloadDocument };
}
