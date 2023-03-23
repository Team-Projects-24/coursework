import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import React from "react";
import { useState } from "react";

/**
 * @author Tom Whitticase
 *
 * @description This component provides a modal for confirming an action.
 */

interface IProps {
  button: JSX.Element;
  message: string;
  action: any;
}
export default function ConfirmModal({ button, message, action }: IProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {React.cloneElement(button, {
        onClick: () => setOpen(true),
      })}

      <Dialog onClose={() => setOpen(false)} open={open}>
        <Box sx={{ p: 2, flexDirection: "column" }}>
          <DialogContent>
            <DialogContentText id="confirmation-dialog-description">
              {message}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant={"outlined"}
              onClick={() => setOpen(false)}
              color="primary"
            >
              Cancel
            </Button>
            <Button
              variant={"contained"}
              onClick={() => {
                action();
                setOpen(false);
              }}
              color="primary"
            >
              Confirm
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
}
