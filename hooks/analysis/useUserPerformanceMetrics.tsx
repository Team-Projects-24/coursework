/**
 *
 * @author Olivia Gray
 *
 * @description Hook to initiate RESTful API request to get performance metrics for selected user(s)
 *
 */

import { useState, useEffect } from "react";
import axios from "axios";

export function useUserPerformanceMetrics(id: String[]) {
  const [performances, setPerformances] = useState();
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(0);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await axios.post(
          "/api/analysis/getUserPerformanceMetrics",
          {
            userIDs: id,
          }
        );
        const { data } = response;
        setPerformances(data);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    }
    fetchData();
  }, [reload]);

  const reloadChat = () => setReload(reload + 1);

  return { performances, loading, reloadChat };
}
