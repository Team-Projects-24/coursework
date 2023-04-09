import {
  Box,
  DialogContent,
  DialogContentText,
  Grid,
  Typography,
} from "@mui/material";
import { IChatMessage } from "types/ChatMessage.d";

export default function MessageContainer(props: IChatMessage) {
  const { content, sentAt } = props;
  return (
    <>
      <Grid container className="message-box" padding={2}>
        <Typography>{content}</Typography>
      </Grid>
      <div>
        <DialogContent>{sentAt.toDateString()}</DialogContent>
      </div>
    </>
  );
}
