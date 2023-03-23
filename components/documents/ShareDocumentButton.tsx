import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import EmailIcon from "@mui/icons-material/Email";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import React from "react";
import ShareIcon from "@mui/icons-material/Share";
import ListItemText from "@mui/material/ListItemText";
import Popover from "components/misc/Popover";
import { ListItemButton } from "@mui/material";

/**
 * @author Tom Whitticase
 *
 * @description This component provides a button that allows the user to share a document via email or copy the link to the clipboard.
 */

interface IProps {
  documentUrl: string;
}
export default function ShareDocumentButton({ documentUrl }: IProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(documentUrl);
  };

  const handleEmail = () => {
    window.location.href = `mailto:?subject=Sharing a document&body=Check out this document: ${documentUrl}`;
  };

  return (
    <>
      <Popover
        button={
          <Button variant={"contained"} startIcon={<ShareIcon />}>
            Share
          </Button>
        }
      >
        <>
          <ListItemButton onClick={handleCopy}>
            <ListItemIcon>
              <FileCopyIcon />
            </ListItemIcon>
            <ListItemText primary="Copy Link" />
          </ListItemButton>
          <ListItemButton onClick={handleEmail}>
            <ListItemIcon>
              <EmailIcon />
            </ListItemIcon>
            <ListItemText primary="Email Link" />
          </ListItemButton>
        </>
      </Popover>
    </>
  );
}
