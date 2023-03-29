import { Box, DialogContent, DialogContentText } from "@mui/material";
import { IChatMessage } from "types/ChatMessage.d";

export default function ChatContainer(props: IChatMessage) {
  const { content, sentAt } = props;
  return (
    <>
      <Box>
        <DialogContent>
          <DialogContentText>{content}</DialogContentText>
        </DialogContent>
      </Box>
    </>
  );
}
