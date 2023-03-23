import { Box, Dialog, Divider, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";

/**
 * @author Tom Whitticase
 *
 * @description This component provides a modal that can be opened/closed by parent component.
 */

interface IProps {
  children: JSX.Element;
  button?: JSX.Element;
  title?: string;
  open: any;
  setOpen: any;
}
export default function ControlledModal({
  button,
  children,
  title = "",
  open,
  setOpen,
}: IProps) {
  return (
    <>
      {button &&
        React.cloneElement(button, {
          onClick: () => setOpen(true),
          className: button.props.className + " cursor-pointer",
        })}
      <Dialog maxWidth="lg" onClose={() => setOpen(false)} open={open}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            bgcolor: "primary.main",
            color: "primary.contrastText",
            textTransform: "uppercase",
          }}
        >
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              paddingLeft: 2,
            }}
            variant={"h6"}
          >
            {title}
          </Typography>
          <IconButton sx={{}} onClick={() => setOpen(false)}>
            <CloseIcon style={{ color: "white" }} />
          </IconButton>
        </Box>
        <Divider />
        <Box
          sx={{
            p: 2,
            flexDirection: "column",
            width: "100%",
            height: "100%",
          }}
        >
          {children}
        </Box>
      </Dialog>
    </>
  );
}
