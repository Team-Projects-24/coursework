/**
 *
 * @author Olivia Gray
 *
 * @description creates and displays a list of all teams (manager) or teams that the team leader manages (team leader)
 *
 */

import { useState } from "react";
import React, { Fragment } from "react";
import UserList from "./UserList";
import { ITeam } from "types/analysis/Team.d";
import { IEmployee } from "types/analysis/Employee.d";

interface Props {
  teams: ITeam[];
  users: IEmployee[][];
  sendTeamsUsers: (
    selectedTeams: boolean[],
    selectedUsers: boolean[][]
  ) => void;
}

function TeamList({ teams, users, sendTeamsUsers }: Props) {
  //console.log(users);
  //console.log(users.length);
  // function for initialising false 2D array for users
  const initialiseUsers = () => {
    //console.log("initialising user list");
    //console.log(users);
    let usersArr = [];
    for (let i = 0; i < users.length; i++) {
      //console.log("USERS");
      usersArr.push(new Array(users[i].length).fill(false));
    }
    //console.log(usersArr);
    return usersArr;
  };

  const [selectedTeams, setSelectedTeams] = useState(
    new Array(teams.length).fill(false)
  );
  const [selectedUsers, setSelectedUsers] = useState(initialiseUsers());
  const [userListInstance, setUserListInstance] = useState(0);

  const handleSelectUser = (index: number, selectedSubUsers: boolean[]) => {
    // Deselect all teams
    setSelectedTeams(new Array(teams.length).fill(false));
    //console.log("handling user");
    //console.log(selectedSubUsers);
    // Update selectedUsers
    //let newState = selectedUsers;
    //newState[index] = selectedSubUsers;
    //newState.splice(index, 1, selectedSubUsers);

    // Build new state
    let newState = [];
    for (let i = 0; i < selectedUsers.length; i++) {
      if (i === index) {
        newState.push([...selectedSubUsers]);
      } else {
        newState.push(selectedUsers[i]);
      }
    }

    console.log(newState);
    setSelectedUsers(newState);
    // Send selected users to TeamUserList component
    sendTeamsUsers(new Array(teams.length).fill(false), newState);
  };

  const onSelectTeam = () => {
    // Deselect all users
    setUserListInstance(userListInstance + 1);
    // Post selectedTeams to TeamUserList component
  };

  //console.log(teams);
  //console.log(users);

  return (
    <ul className="list-group">
      {teams.map((team, index) => (
        <React.Fragment key={team.name}>
          <li
            className={
              selectedTeams[index] === true
                ? "list-group-item active"
                : "list-group-item"
            }
            key={team.name}
            onClick={() => {
              // (un/)highlight selected team
              let newTeamState = [...selectedTeams];
              newTeamState[index] = !newTeamState[index];
              setSelectedTeams(newTeamState);

              // Deselect all users
              onSelectTeam();

              // Send selected teams, no users selected
              let newUserState = initialiseUsers();
              //console.log(newUserState);
              setSelectedUsers(newUserState);
              sendTeamsUsers(newTeamState, newUserState);
            }}
            style={{
              height: "5rem",
              fontSize: "2.5rem",
              textAlign: "left",
            }}
          >
            {team.name}
          </li>
          <UserList
            key={userListInstance}
            users={users[index]}
            teamIndex={index}
            onSelectUser={handleSelectUser}
          />
        </React.Fragment>
      ))}
    </ul>
  );
}

export default TeamList;
