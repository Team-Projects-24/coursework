import {
  Box,
  DialogContent,
  DialogContentText,
  Grid,
  Typography,
} from "@mui/material";
import { IChatMessage } from "types/ChatMessage.d";

export default function MessageContainer() {

  return (
    <>
      <Grid container className="message-box" padding={2}>
        <Typography>Hey this is tom</Typography>
      </Grid>
      <div>
        <DialogContent>10/04/23</DialogContent>
      </div>
    </>
  );
}
