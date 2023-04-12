import { Box, Grid, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import useUserStore from "stores/userStore";
import { useEffect, useState } from "react";
import { IUser } from "types/User.d";
import axios from "axios";
import UserCard from "components/chat/menu/UserCard";
import ProfileWrack from "components/chat/menu/ProfileWrack";
import SearchIcon from "@mui/icons-material/Search";




export default function createChat() {
    const [partialId, setPartialId] = useState<string>("");
    
    return (
        <Box minHeight="100%" className="second-colour">
            <Grid
                container paddingY={2} columnSpacing={3}
                className="main-colour" margin={0} width="100%"
            >
                <Grid 
                    item color="#d9dee0" display="flex" alignItems="center"
                    xs="auto" padding={0}
                >
                    <ArrowBackIcon />
                </Grid>
                <Grid item xs="auto" padding={0}>
                    <Typography
                        color="#d9dee0"
                        variant="h6"
                    >New chat</Typography>
                </Grid>
            </Grid>
            <Box>
                <Box paddingX={5} paddingTop={2}>
                <Grid
                    container
                    paddingY={1}
                    borderRadius={3}
                    className="main-colour"
                >
                    <Grid item paddingLeft={2} xs="auto">
                        <SearchIcon className="icon" />
                    </Grid>
                    <Grid item paddingLeft={4} xs={11}>
                        <input
                            type="text"
                            placeholder="Search user by id"
                            className="main-colour search"
                        />
                    </Grid>
                </Grid>
                </Box>
                <ProfileWrack partialId={partialId} />
            </Box>
        </Box>
    )
}