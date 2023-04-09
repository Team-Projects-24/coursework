import { useState } from "react";
import React, { Fragment } from "react";
import UserList from "./UserList";


interface Props {
  teams: string[];
  users: string[][];
  sendTeamsUsers: (
    selectedTeams: boolean[],
    selectedUsers: boolean[][]
  ) => void;
}

function TeamList({ teams, users, sendTeamsUsers }: Props) {
  const [selectedTeams, setSelectedTeams] = useState([false, false]);
  const [selectedUsers, setSelectedUsers] = useState([
    [false, false, false],
    [false, false, false],
  ]);
  const [userListInstance, setUserListInstance] = useState(0);

  const handleSelectUser = (index: number, selectedSubUsers: boolean[]) => {
    // Deselect all teams
    setSelectedTeams([false, false]);

    // Update selectedUsers
    let newState = selectedUsers;
    newState[index] = selectedSubUsers;
    setSelectedUsers(newState);

    // Send selected users to TeamUserList component
    sendTeamsUsers(new Array(teams.length).fill(false), newState);
  };

  const onSelectTeam = () => {
    // Deselect all users
    setUserListInstance(userListInstance + 1);
    // Post selectedTeams to TeamUserList component
  };

  return (
    <ul className="list-group">
      {teams.map((team, index) => (
        <React.Fragment key={team}>
          <li
            className={
              selectedTeams[index] === true
                ? "list-group-item active"
                : "list-group-item"
            }
            key={team}
            onClick={() => {
              // (un/)highlight selected team
              let newTeamState = [...selectedTeams];
              newTeamState[index] = !newTeamState[index];
              setSelectedTeams(newTeamState);

              // Deselect all users
              onSelectTeam();

              // Send selected teams, no users selected
              let newUserState = [
                [false, false, false],
                [false, false, false],
              ];
              setSelectedUsers(newUserState);
              sendTeamsUsers(newTeamState, newUserState);
            }}
            style={{
              height: "5rem",
              fontSize: "2.5rem",
              textAlign: "left",
            }}
          >
            {team}
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
