import { Box, DialogContent, DialogContentText } from "@mui/material";
import { IChatMessage } from "types/ChatMessage.d";

export default function ChatContainer(props: IChatMessage) {
  const { body, timestamp } = props;
  return (
    <>
      <Box>
        <DialogContent>
          <DialogContentText>{body}</DialogContentText>
        </DialogContent>
      </Box>
    </>
  );
}
