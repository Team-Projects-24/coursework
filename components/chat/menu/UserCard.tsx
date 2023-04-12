/**
 * @author Ade Osindero
 *
 * @description Implements react component which serves to display the
 * chat rooms of the current user, on the menu of the text chat subsytem.
 */

import { Grid, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import axios from "axios";
import { IChatMessage } from "types/ChatMessage.d";
import DoneIcon from "@mui/icons-material/Done";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import GroupIcon from "@mui/icons-material/Group";
import { Message } from "@prisma/client";
import { difference } from "lodash";
import { IChatMenu } from "types/ChatMenu.d";
import { useRouter } from "next/router";
import { IUser } from "types/User.d";
import useUserStore from "stores/userStore";


/**
 * @author Ade Osindero
 *
 * @param userId - The id of the user.
 * @returns A react component (the card) detailing information of the user.
 */
export default function UserCard({ userId }: { userId: string }) {
  const [user, setUser] = useState<IUser>();
  const router = useRouter();

  useEffect(() => {
    async function getUser() {
      const { data } = await axios.post("/api/users/getUserInfo", {
        username: userId,
      });
      setUser(data as IUser);
    }
    getUser();
  }, []);

  if (!user) {
    return <></>;
  }

  return (
    <Grid container className="menu-card" paddingX={2}>
        <Grid item container xs="auto" padding={2}>
            <Grid item padding={1} className="icon-container">
                <PersonIcon className="icon" />
            </Grid>
        </Grid>
        <Grid item container className="menu-card-right" xs={11}>
            <Grid container direction="column">
                <Grid item xs="auto">
                    <Typography color="#e9edef" fontSize={18}>
                        {user.name}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography>ID: {user.userId}</Typography>
                </Grid>
            </Grid>
        </Grid>
    </Grid>
  );
}
