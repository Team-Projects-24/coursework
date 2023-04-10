import { useState, useEffect } from "react";
import axios from "axios";

export function useTeamMembers(id: number[]) {
  const [members, setMembers] = useState();
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(0);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await axios.post("/api/analysis/getTeamMembers", { teamID: id });
        const { data } = response;
        setMembers(data);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    }
    fetchData();
  }, [reload]);

  const reloadChat = () => setReload(reload + 1);

  return { members, loading, reloadChat };
}
