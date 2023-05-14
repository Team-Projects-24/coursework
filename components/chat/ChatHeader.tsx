import {
  Avatar,
  Button,
  CardHeader,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";

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
}

export default function ChatHeader({ chatName, chatId }: ChatHeaderProps) {
  const router = useRouter();

  const handleClick = async () => router.push(`/chat/${chatId}/info`);

  return (
    <>
      <CardHeader
        sx={{
          backgroundColor: "#202c33",
          boxShadow: "0px 10px 10px rgba(0, 0, 0, 0.3)",
          paddingInline: 3,
          height: 62,
        }}
        avatar={
          <Link href="#" onClick={handleClick}>
            <Avatar src="" alt={chatName} className="avatar" />
          </Link>
        }
        title={chatName}
        subheader="Click here for chatroom info"
      />
      <style>{`
        	span.MuiTypography-root.MuiTypography-body2.MuiCardHeader-title.css-et1ao3-MuiTypography-root {
            font-size: 16px;
            font-weight: 500;
            color: #e9edef;
          }

          .MuiCardHeader-subheader {
            color: #83939d;
          }
      `}</style>
    </>
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
