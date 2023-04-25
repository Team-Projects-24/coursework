/**
 *
 * @author Olivia Gray
 *
 * @description Hook to initiate RESTful API request to get teams that a user manages
 *
 */

import { useState, useEffect } from "react";
import axios from "axios";

export function useTeams(id: number[]) {
  const [teams, setTeams] = useState();
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(0);

  //console.log(id);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await axios.post("/api/analysis/getTeams", {
          teamID: id,
        });
        const { data } = response;
        setTeams(data);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  const reloadChat = () => setReload(reload + 1);

  return { teams, loading, reloadChat };
}
