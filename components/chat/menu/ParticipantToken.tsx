import { Grid, Typography } from "@mui/material";
import { IUser } from "types/User.d";
import PersonIcon from "@mui/icons-material/Person";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { Animated } from "react-animated-css";

interface ParticipantTokenArgs {
  user: IUser;
  removeResponse: (user: IUser) => void;
  allowRemoval: boolean;
}

/**
 * @author Ade Osindero
 *
 * @param user - The user who's data is being put on the token.
 * @param removeResponse - A function to run when the token is removed.
 * @param allowRemoval - A boolean indicating whether or not the token should be removable.
 * @returns The token, having the user's data.
 */
export default function ParticipantToken({
  user,
  removeResponse,
  allowRemoval,
}: ParticipantTokenArgs) {
  const [hover, setHover] = useState<boolean>(false);

  return (
    <Grid
      container
      borderRadius={5}
      direction="row"
      sx={{ cursor: "pointer" }}
      bgcolor={hover ? "#2a3942" : "#182229"}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Grid item container xs="auto" padding={2}>
        <Grid
          item
          padding={1.2}
          bgcolor="#00a884"
          borderRadius={10}
          color="#aebac1"
        >
          <PersonIcon />
        </Grid>
      </Grid>
      <Grid item container direction="column" justifyContent="center" xs>
        <Grid item>
          <Typography color="#e9edef" fontSize={18} noWrap>
            {user.name}
          </Typography>
        </Grid>
        <Grid item>
          <Typography color="#8696a0" noWrap>
            ID: {user.userId}
          </Typography>
        </Grid>
      </Grid>
      <Grid
        item
        alignItems="center"
        display="flex"
        color="#8696a0"
        paddingRight={2}
        xs="auto"
      >
        {allowRemoval ? (
          /* @ts-ignore */
          <Animated
            animationIn="zoomIn"
            animationOut="zoomOut"
            animationInDuration={300}
            animationOutDuration={300}
            isVisible={hover}
          >
            <CloseIcon onClick={(e) => removeResponse(user)} />
          </Animated>
        ) : (
          <></>
        )}
      </Grid>
    </Grid>
  );
}
