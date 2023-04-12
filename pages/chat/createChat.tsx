import { Grid, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function createChat() {
    return (
        <>
            <nav className="main-colour">
                <Grid>
                    <Grid item>
                        <ArrowBackIcon />
                    </Grid>
                    <Grid item>
                        <Typography>New Chat</Typography>
                    </Grid>
                </Grid>
            </nav>
        </>
    )
}