import { useState, useEffect } from "react";
import axios from "axios";

export function useTeams(id: string) {
  const [teams, setTeams] = useState();
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(0);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await axios.post("/api/analysis/getTeams", { id });
        const { data } = response;
        setTeams(data);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    }
    fetchData();
  }, [reload]);

  const reloadChat = () => setReload(reload + 1);

  return { teams, loading, reloadChat };
}
