import { Box, Grid, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import useUserStore from "stores/userStore";
import { useEffect, useState } from "react";
import { IUser } from "types/User.d";
import axios from "axios";
import UserCard from "components/chat/menu/UserCard";
import ProfileWrack from "components/chat/menu/ProfileWrack";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/router";


export default function createChat() {
    const [partialId, setPartialId] = useState<string>("");
    const { user, setUser } = useUserStore();
    const router = useRouter();
    
    return (
        <Box minHeight="100%" className="second-colour">
            <Grid
                container paddingY={2} columnSpacing={3}
                className="primary-colour" margin={0} width="100%"
            >
                <Grid 
                    item color="#d9dee0" display="flex" alignItems="center"
                    xs="auto" padding={0}
                >
                    <ArrowBackIcon
                        className="arrowBack" onClick={() => router.back()}
                    />
                </Grid>
                <Grid item xs="auto">
                    <Typography
                        color="#d9dee0"
                        variant="h6"
                    >New chat</Typography>
                </Grid>
            </Grid>
            <Box>
                <Box paddingX={2} paddingTop={1}>
                    <Grid
                        container
                        paddingY={1}
                        borderRadius={2}
                        className="primary-colour"
                    >
                        <Grid item paddingLeft={2} xs="auto">
                            <SearchIcon className="icon" />
                        </Grid>
                        <Grid item paddingLeft={4} xs={11}>
                            <input
                                type="text"
                                placeholder="Search user by id"
                                className="primary-colour search"
                                onChange={(e) => setPartialId(
                                    e.currentTarget.value
                                )}
                            />
                        </Grid>
                    </Grid>
                </Box>
                <ProfileWrack partialId={partialId} response={
                    async (selectedUser) => {
                        var chat = user?.chatrooms.filter(
                            (chatroom) => chatroom.private &&
                                chatroom.members
                                .map((member) => member.userId)
                                .includes(selectedUser.userId)
                        ).at(0)

                        if (!chat) {
                            chat = (await axios.post(
                                "/api/chat/createPrivateChat", {
                                    creatorId: user?.userId,
                                    participantId: selectedUser.userId
                                }
                            )).data;
                            const { data } = await axios.post(
                                "/api/users/getUserInfo",
                                { username: user?.userId }
                            );
                            setUser(data as IUser);
                        };

                        router.push(`/chat/${chat!.id}`);
                    }
                } />
            </Box>
        </Box>
    )
}