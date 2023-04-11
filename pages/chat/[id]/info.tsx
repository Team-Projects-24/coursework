import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import useUserStore from "stores/userStore";

export default function InfoPage() {
  const router = useRouter();
  const { id } = router.query;
  const chatroomId = parseInt(id as string);
  const user = useUserStore((state) => state.user);

  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.href);
    }
  }, []);

  return (
    <div>
      <h1>Info Page</h1>
    </div>
  );
}
