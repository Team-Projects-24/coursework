import { User } from "@prisma/client";
import { ReactElement } from "react";
import UserCard from "../menu/UserCard";
import { Avatar, Grid } from "@mui/material";

interface MembersListProps {
  members: User[];
}

export default function MembersList({ members }: MembersListProps) {
  // const listItems = memList.map((person) => <li>{person}</li>);
  return (
    <>
      <Grid container>
        {members?.map((person) => (
          <Grid
            item
            container
            direction={"row"}
            width="100%"
            alignContent={"center"}
            justifyContent={"center"}
          >
            <Grid item xs="auto">
              <Avatar
                src={person.profileImage as string}
                alt={person.name}
                className="avatar"
              />
            </Grid>
            <Grid item>{person.name}</Grid>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
