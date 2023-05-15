/**
 * @author Ade Osindero
 *
 * @description Implements react component which serves to display the
 * chat rooms of the current user, on the menu of the text chat subsytem.
 */

import { Grid, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { IUser } from "types/User.d";
import { useState } from "react";

interface UserCardArgs {
  user: IUser,
  response: ((arg0: IUser) => void)
}

/**
 * @author Ade Osindero
 *
 * @param user - The user to be represented by the card.
 * @param response - The behaviour of the card upon being selected.
 * @returns A react component (the card) detailing information of the user.
 */
export default function UserCard({user, response}: UserCardArgs) {
  const [hover, setHover] = useState<boolean>(false);

  return (
    <Grid
      container
      sx={{ cursor: "pointer", }}
      bgcolor={hover ? "#2a3942" : "inherit"}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      color={hover ? "#e9edef" : "#8696a0"}
      onClick={() => response(user)}>
      <Grid item container xs="auto" padding={2}>
        <Grid
          item
          padding={1.2}
          bgcolor="#00a884"
          borderRadius={10}
          color="#aebac1">
          <PersonIcon />
        </Grid>
      </Grid>
      <Grid
        item
        container
        borderTop="solid 1.2px"
        borderColor="#222d34"
        alignItems="center"
        display="flex"
        xs>
        <Grid container direction="column">
          <Grid item xs="auto">
            <Typography color="#e9edef" fontSize={18} noWrap>
              {user.name}
            </Typography>
          </Grid>
          <Grid item>
            <Typography noWrap>ID: {user.userId}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
