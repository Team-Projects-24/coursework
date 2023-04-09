/**
 * 
 * @author Olivia Gray 
 * 
 * @description combines TeamList and UserList so that employees within a team are displayed under their team list item
 * 
 */

import TeamList from "./TeamList";

interface Props {
  onSelectTeamUser: (teamUserState: number) => void;
}

function TeamUserList({ onSelectTeamUser }: Props) {
  const handleTeamsUsers = (
    selectedTeams: boolean[],
    selectedUsers: boolean[][]
  ) => {
    // Handle logic of whether employees or teams are selected

    // Count how many teams have been selected
    let teamCount = 0;
    for (let i in selectedTeams) {
      if (selectedTeams[i] === true) teamCount++;
    }

    if (teamCount === 1) {
      // Single team selected
      //console.log("Single team");
      onSelectTeamUser(0);
    } else if (teamCount > 1) {
      // Multiple teams selected
      //console.log("Multiple teams");
      onSelectTeamUser(1);
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
  };

  return (
    <>
      <div className="containerComp">
        <TeamList
          teams={["Team 1", "Team 2"]}
          users={[
            ["Bob", "Anna", "Steve"],
            ["Mark", "Maria", "Tracy"],
          ]}
          sendTeamsUsers={handleTeamsUsers}
        />
      </div>
    </>
  );
}

export default TeamUserList;
