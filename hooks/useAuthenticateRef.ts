import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

/**
 * @author Tom Whitticase
 *
 * @description This hook is used to authenticate an invitation reference code.
 *
 * @input {string} ref - The reference code to authenticate
 *
 * @output {boolean} loading - Whether the authentication is still loading
 * @output {boolean} authenticated - Whether the reference code is valid
 */

export function useAuthenticateRef() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { ref } = router.query;

  useEffect(() => {
    if (!router.isReady) return;
    async function fetchData() {
      setLoading(true);
      let data = {
        ref,
      };
      try {
        console.log("A:" + data.ref);
        let response = await axios.post("/api/email/authenticateRef", data);
        console.log("b:" + response.data);
        if (response.data) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
        }
        setLoading(false);
      } catch (error) {
        setAuthenticated(false);
        setLoading(false);
      }
    }
    fetchData();
  }, [router.isReady]);

  return { loading, authenticated, ref };
}
