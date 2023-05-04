import { Grid, Typography } from "@mui/material";
import { IUser } from "types/User.d";
import PersonIcon from "@mui/icons-material/Person";
import CloseIcon from '@mui/icons-material/Close';


interface ParticipantTokenArgs {
  user: IUser,
  removeResponse: ((user: IUser) => void)
}

export default function ParticipantToken({ user, removeResponse }: ParticipantTokenArgs) {
  return (
    <Grid container bgcolor="#182229" borderRadius={10} direction="row" className="info-card">
      <Grid item container xs="auto" padding={2}>
        <Grid item padding={1.2} bgcolor="#00a884" borderRadius={10}>
          <PersonIcon className="icon" />
        </Grid>
      </Grid>
      <Grid item container direction="column" justifyContent="center" xs>
        <Grid item>
          <Typography color="#e9edef" fontSize={18} noWrap>{user.userId}</Typography>
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
        <CloseIcon onClick={(e) => removeResponse(user)} />
      </Grid>
    </Grid>
  );
}