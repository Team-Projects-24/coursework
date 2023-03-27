import { Grid, Typography } from "@mui/material";
import { Chatroom } from "@prisma/client";
import PersonIcon from '@mui/icons-material/Person';
import { Box } from "@mui/system";

export default function MenuCard({ chat }: { chat: Chatroom }) {
    const chatActivityDate = new Date(chat.updatedAt);
    const now = new Date();
    var lastUpdated: string;
    if (now.getDate() == chatActivityDate.getDate()) {
        lastUpdated = chatActivityDate.toLocaleString(
            "en-uk", { timeStyle: "short" }
        );
        console.log(lastUpdated);
    } else if (now.getDay() - chatActivityDate.getDay() < 7) {
        lastUpdated = chatActivityDate.toLocaleString(
            "en-uk", {  weekday: "long" }
        );
    } else {
        lastUpdated = chatActivityDate.toLocaleDateString("en-uk");
    }
    return (
        <>
            <Grid container className="menu-card" paddingX={3}>
                <Grid item xs="auto" padding={1}>
                    <Box padding={1} className="icon-container">
                        <PersonIcon className="icon"/>
                    </Box>
                </Grid>
                <Grid item paddingLeft={2} xs={11}>
                    <Grid container padding={1} direction={"column"}>
                        <Grid
                            item container xs={12}
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Grid item xs="auto">
                                <Typography
                                    color="#e9edef"
                                    fontSize={18}
                                >{chat.name}</Typography>
                            </Grid>
                            <Grid item xs="auto">
                                <Typography
                                    fontSize={15}
                                    color="#8696a0"
                                >{lastUpdated}</Typography>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Typography
                                fontSize={15}
                            >{chat.description}</Typography>
                        </Grid>
                    </Grid>
                    <hr />
                </Grid>
            </Grid>
        </>
    )
}