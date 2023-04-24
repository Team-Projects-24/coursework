import {
  Box,
  DialogContent,
  DialogContentText,
  Grid,
  Typography,
} from "@mui/material";
import { IChatMessage } from "types/ChatMessage.d";

export default function MessageContainer(props: IChatMessage) {	export default function MessageContainer() {
  const { content, sentAt } = props;	
  return (	  return (
    <>	    <>
      <Grid container className="message-box" padding={2}>	      <Grid container className="message-box" padding={2}>
        <Typography>{content}</Typography>	        <Typography>Hey this is tom</Typography>
      </Grid>	      </Grid>
      <div>	      <div>
        <DialogContent>{sentAt.toDateString()}</DialogContent>	        <DialogContent>10/04/23</DialogContent>
      </div>
    </>
  );
}
