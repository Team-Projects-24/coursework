/**
 *
 * @author Olivia Gray
 *
 * @description Hook to initiate RESTful API request to get team IDs that a user manages
 *
 */

import { useState, useEffect } from "react";
import axios from "axios";

export function useTeamLeaders(id: String) {
  const [teamIDs, setTeamIDs] = useState();
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(0);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await axios.post("/api/analysis/getTeamIDs", {
          leaderID: id,
        });
        const { data } = response;
        setTeamIDs(data);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  const reloadChat = () => setReload(reload + 1);

  return { teamIDs, loading, reloadChat };
}
