// import ChatContainer from "../components/chat/ChatContainer";
import { useRouter } from "next/router";
import MessageContainer from "components/chat/MessageContainer";
import { useEffect, useState } from "react";
import { useChatroom } from "hooks/useChatroom";
import { IChatMessage } from "types/ChatMessage.d";
// import { Box, DialogContent, DialogContentText } from "@material-ui/core";
import useUserStore from "stores/userStore";

const message = "Hello World! page";

export default function ChatPage() {
  const router = useRouter();
  const { id } = router.query;
  const [url, setUrl] = useState<string>("");
  const chatroomId = parseInt(id as string);

  const { loading, messages, members, sendMessage } = useChatroom(chatroomId);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.href);
    }
  }, []);

  return (
    <>
      {loading ? <div>Loading...</div> : <div></div>}
      {
        <p> No messages in this chat</p>

        // <MessageContainer id={0} chatroomId={0} senderId={0} content={""} sentAt={undefined} sender={undefined} chatroom={undefined} seenByIds={[]}/>
      }
    </>
  );
}
