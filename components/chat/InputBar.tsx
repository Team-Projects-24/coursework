import { Button, Container, Grid, TextField } from "@mui/material";
import { createElement } from "react";
import { AiOutlinePaperClip, AiOutlineSend } from "react-icons/ai";
import { IconType } from "react-icons";

interface IInputBarProps {
  onSend: () => void;
  onAttach: () => void;
}

export default function InputBar({ onSend, onAttach }: IInputBarProps) {
  return (
    <Grid
      container
      className="input-bar"
      // position="fixed"
      bottom={0}
      height={"7.5%"}
      padding={1}
    >
      <Grid width="5%" alignContent="center">
        <Button fullWidth onClick={onAttach}>
          <AiOutlinePaperClip size={30} />
        </Button>
      </Grid>
      <Grid width="90%" alignContent={"center"}>
        <TextField id="message" variant="outlined" fullWidth size="small" />
      </Grid>
      <Grid width="5%" alignContent="center">
        <Button fullWidth onClick={onSend}>
          {" "}
          <AiOutlineSend size={30} />
        </Button>
      </Grid>
    </Grid>
  );
}
