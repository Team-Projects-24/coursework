import MUIPopover from "@mui/material/Popover";
import React from "react";

/**
 * @author Tom Whitticase
 *
 * @description This component provides a popover for displaying additional information.
 */

interface IProps {
  button: JSX.Element;
  children: JSX.Element;
}
export default function Popover({ button, children }: IProps) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      {React.cloneElement(button, {
        onClick: handleClick,
        className: button.props.className + " cursor-pointer",
      })}
      <MUIPopover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        {children}
      </MUIPopover>
    </>
  );
}
