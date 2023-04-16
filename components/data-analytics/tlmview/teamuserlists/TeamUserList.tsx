/**
 *
 * @author Olivia Gray
 *
 * @description combines TeamList and UserList so that employees within a team are displayed under their team list item
 *
 */

import TeamList from "./TeamList";
import { ITeam } from "types/analysis/Team.d";
import { IEmployee } from "types/analysis/Employee.d";
import { useEffect } from "react";

interface Props {
  teams: ITeam[];
  users: IEmployee[][];
  onSelectTeamUser: (teamUserState: number) => void;
  onSendTeamUser: (
    selectedTeams: boolean[],
    selectedUsers: boolean[][]
  ) => void;
}

function TeamUserList({
  onSelectTeamUser,
  onSendTeamUser,
  teams,
  users,
}: Props) {
  const handleTeamsUsers = (
    selectedTeams: boolean[],
    selectedUsers: boolean[][]
  ) => {
    // Handle logic of whether employees or teams are selected
    //console.log(selectedUsers);
    //console.log(selectedTeams);
    // Count how many teams have been selected
    let teamCount = 0;
    for (let i in selectedTeams) {
      if (selectedTeams[i] === true) teamCount++;
    }

    if (teamCount === 1) {
      // Single team selected
      //console.log("Single team");
      onSelectTeamUser(0);
      //onSendTeamUser(selectedTeams, selectedUsers);
    } else if (teamCount > 1) {
      // Multiple teams selected
      //console.log("Multiple teams");
      onSelectTeamUser(1);
      //onSendTeamUser(selectedTeams, selectedUsers);
    } else {
      // Count how many users have been selected
      let userCount = 0;
      for (let i in selectedUsers) {
        for (let j in selectedUsers[i]) {
          if (selectedUsers[i][j] === true) userCount++;
        }
      }
      if (userCount === 1) {
        // Single user selected
        //console.log("Single user");
        onSelectTeamUser(0);
      } else if (userCount > 1) {
        // Multiple users selected
        //console.log("Multiple users");
        onSelectTeamUser(1);
      } else {
        // Nothing selected
        //console.log("Nothing selected");
        onSelectTeamUser(-1);
      }
    }
    onSendTeamUser(selectedTeams, selectedUsers);
  };

  //console.log(teams);
  //console.log(users);

  return (
    <>
      <div className="containerComp">
        <TeamList
          teams={teams ? teams : []}
          users={users ? users : []}
          sendTeamsUsers={handleTeamsUsers}
        />
      </div>
    </>
  );
}

export default TeamUserList;
