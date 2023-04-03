
import { useState, useEffect } from "react";
import axios from "axios";

export function useTeamMembers(id: string) {
  const [members, setMembers] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await axios.post("/api/analyis/getTeamMembers", { id });
        const { data } = response;
        setMembers(data);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    }
    fetchData();
  });


  console.log(members);

  return { members, loading };
}
