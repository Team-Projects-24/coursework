import { User } from "@prisma/client";
import { ReactElement } from "react";
import UserCard from "../menu/UserCard";
import { Avatar, Grid,Typography, createTheme, withStyles } from "@mui/material";

interface MembersListProps {
  members: User[];
}
/*
const styledList = withStyles({
  
})*/

export default function MembersList({ members }: MembersListProps) {
  // const listItems = memList.map((person) => <li>{person}</li>);
  return (
    <>
    <Grid container direction="column" padding={0}>
      {members?.map((person)=>  (
        <Grid container direction="row" alignItems="center" spacing={3} padding={1}>
        <Grid item>
          <Avatar
          src={person.profileImage as string}
          alt={person.name}
          className="avatar"
          />
          </Grid>
          <Grid item>
            {person.name}
          </Grid>
        </Grid>
      ))}
    </Grid>
    </>
  );
}

