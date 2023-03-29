// import ChatContainer from "../components/chat/ChatContainer";
import { useRouter } from "next/router";
import ChatContainer from "components/chat/ChatContainer";
import { useEffect, useState } from "react";
import { useChatrooms } from "hooks/useChatrooms";

const message = "Hello World! page";

export default function ChatPage() {
  const router = useRouter();
  const { id } = router.query;
  const [url, setUrl] = useState<string>("");

  const { loading, messages, members, sendMessage } = useChatrooms(
    parseInt(id as string)
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.href);
    }
  }, []);

  return <>{ChatContainer}</>;
}
