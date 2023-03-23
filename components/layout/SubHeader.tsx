import { Box, Divider } from "@mui/material";

/**
 * @author Tom Whitticase
 *
 * @description This component is for adding subheader to a page.
 */

interface ISubHeaderProps {
  children: JSX.Element;
}

export default function SubHeader({ children }: ISubHeaderProps) {
  return (
    <>
      <Box sx={{ padding: 1 }}>{children}</Box>
      <Divider />
    </>
  );
}
