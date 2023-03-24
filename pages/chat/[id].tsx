// import ChatContainer from "../components/chat/ChatContainer";
import { useRouter } from "next/router";
import { ChatContainer } from "components/chat/ChatContainer";

const message = "Hello World! page";

export default function ChatPage() {
  const router = useRouter();
  const { id } = router.query;

  return <>{ChatContainer}</>;
}
