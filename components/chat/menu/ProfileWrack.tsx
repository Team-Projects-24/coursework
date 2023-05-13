import { Box, Typography } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import { IUser } from "types/User.d";
import UserCard from "./UserCard";

interface ProfileWrackArgs {
  partialId: string,
  response: ((arg0: IUser) => void)
}

export default function ProfileWrack({ partialId, response }: ProfileWrackArgs) {
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);

  var currentLetter = "";

  useEffect(() => {
    async function getUsers() {
      const { data } = await axios.get("/api/users/getUsers");

      setUsers(data as IUser[]);
    }
    getUsers();
  }, []);

  useEffect(() => {
    setFilteredUsers(users
      .filter(user => user.userId.toUpperCase()
      .startsWith(partialId.toUpperCase())));
  }, [users, partialId])

  return !users ? <></> : (
    <Box width="100%">
      {filteredUsers.map((user: IUser) => {
        if (!currentLetter || !user.name.toUpperCase()
          .startsWith(currentLetter)) {
          currentLetter = user.name.charAt(0).toUpperCase();
          return (
            <Box>
              <Box color="#00a884" paddingY={2} paddingX={4}>
                <Typography>{currentLetter}</Typography>
              </Box>
              <UserCard key={user.userId} user={user} response={response} />
            </Box>
          );
        }
        return <UserCard key={user.userId} user={user} response={response} />;
      })}
    </Box>
  );
}