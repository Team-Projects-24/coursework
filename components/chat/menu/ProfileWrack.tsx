import { Box, Typography } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import { IUser } from "types/User.d";
import UserCard from "./UserCard";

export default function ProfileWrack(
    { partialId, response }: {
        partialId: string, response: ((arg0: IUser) => void)
    }
) {
    const [users, setUsers] = useState<IUser[]>();
    var currentLetter = "";
    var i = 0;

    useEffect(() => {
        setUsers(undefined);
        async function getUsers() {
            const { data } = await axios.post(
                "/api/users/getUsersById", { partialId }
            );
            setUsers(data as IUser[]);
        }
        getUsers();
    }, [partialId])

    return !users? <></> : (
        <Box>
            {users.map((user) => {
                if (
                    !currentLetter ||
                    !user.name.toUpperCase().startsWith(currentLetter)
                ) {
                    currentLetter = user.name.charAt(0).toUpperCase();
                    return (
                        <Box>
                            <Box color="#00a884" paddingY={2} paddingX={4}>
                                <Typography>{currentLetter}</Typography>
                            </Box>
                            <UserCard
                                key={i++} user={user} response={response}
                            />
                        </Box>
                    );
                }
                return <UserCard key={i++} user={user} response={response} />;
            })}
        </Box>
    );
}