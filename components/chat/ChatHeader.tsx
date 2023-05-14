import {
  Avatar,
  Box,
  Button,
  CardHeader,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";

/**
 * @author Ben Pritchard
 *
 * @description Implements react component which serves to display the header of the chat.
 * @param chatName - The name of the chat.
 * @param chatId - The id of the chat.
 * @returns A react component (the header) which displays the name and image of the chat.
 */

interface ChatHeaderProps {
  chatName: string;
  chatId: number;
  isPrivate: boolean;
}

export default function ChatHeader({
  chatName,
  chatId,
  isPrivate,
}: ChatHeaderProps) {
  const router = useRouter();

  const handleClick = async () => router.push(`/chat/${chatId}/info`);

  return (
    <CardHeader
      sx={{
        backgroundColor: "#202c33",
        boxShadow: "0px 10px 10px rgba(0, 0, 0, 0.3)",
        paddingInline: 3,
        height: 62,
      }}
      avatar={
        <Link href="#" onClick={handleClick}>
          <Box
            padding={1.2}
            borderRadius={20}
            bgcolor="#6a7175"
            color="#aebac1"
          >
            {isPrivate ? <PersonIcon /> : <GroupIcon />}
          </Box>
        </Link>
      }
      title={
        <Link href="#" onClick={handleClick} underline="none">
          <Typography fontSize={16} fontWeight={500} color="#e9edef">
            {chatName}
          </Typography>
        </Link>
      }
      subheader={
        <Link href="#" onClick={handleClick} underline="none">
          <Typography fontSize="0.8125rem" color="#8696a0">
            Click here for chatroom info
          </Typography>
        </Link>
      }
    />
  );
}

{
  /* <Grid container>
        <Grid
          item
          xs={0.5}
          justifyContent="center"
          display="flex"
          justifyItems="center"
          alignContent="center"
          alignItems="center"
          paddingX={5}>
          
        </Grid> */
}
{
  /* <Grid
          item
          flex={4}
          xs={5.25}
          justifyContent="center"
          alignContent="center">
          <Typography fontWeight={500} fontSize={18} color="#e9edef" noWrap>
            {props.chatName}
          </Typography>
        </Grid>
      </Grid> */
}
