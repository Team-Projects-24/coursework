import { Grid, Typography } from "@mui/material";
import { IUser } from "types/User.d";
import PersonIcon from "@mui/icons-material/Person";
import CloseIcon from '@mui/icons-material/Close';


interface ParticipantTokenArgs {
  user: IUser,
  removeResponse: ((user: IUser) => void),
  allowRemoval: boolean,
}


/**
 * @author Ade Osindero
 * 
 * @param user - The user who's data is being put on the token.
 * @param removeResponse - A function to run when the token is removed.
 * @param allowRemoval - A boolean indicating whether or not the token should be removable. 
 * @returns The token, having the user's data.
 */
export default function ParticipantToken({ user, removeResponse, allowRemoval }: ParticipantTokenArgs) {
  return (
    <Grid
      container
      bgcolor="#182229"
      borderRadius={10}
      direction="row"
      className="info-card">
      <Grid item container xs="auto" padding={2}>
        <Grid item padding={1.2} bgcolor="#00a884" borderRadius={10}>
          <PersonIcon className="icon" />
        </Grid>
      </Grid>
      <Grid item container direction="column" justifyContent="center" xs>
        <Grid item>
          <Typography color="#e9edef" fontSize={18} noWrap>
            {user.name}
          </Typography>
        </Grid>
        <Grid item>
          <Typography color="#8696a0" noWrap>ID: {user.userId}</Typography>
        </Grid>
      </Grid>
      <Grid
        item
        alignItems="center"
        className="remove-icon-container"
        paddingRight={2}
        xs="auto">
        { allowRemoval ? 
          <CloseIcon onClick={(e) => removeResponse(user)} /> : <></> }
      </Grid>
    </Grid>
  );
}