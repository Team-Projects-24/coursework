/**
 *
 * @author Olivia Gray
 *
 * @description puts all tlm components together to create the view for team leaders and managers
 *
 */

import { useEffect, useState } from "react";
import GraphContainer from "./graph/GraphContainer";
import TeamUserList from "./teamuserlists/TeamUserList";
import TimeFrameContainer from "./timeframe/TimeFrameContainer";
import { useTeamMembers } from "hooks/analysis/useTeamMembers";

function DataAnalyticsWindow() {
  const [teamUserState, setTeamUserState] = useState(-1);
  const [timeFrameState, setTimeFrameState] = useState(false);
  const [graphState, setGraphState] = useState(-1);

  // Get the currently logged in user
  // useTeamLeaders();
  // The API should only return teams and team members that this user manages

  let teams = useTeams([1, 2, 3]).teams;
  //console.log(teams);

  let members = useTeamMembers([1, 2, 3]).members;
  //console.log(members);

  // handler events
  const handleTeamUser = (newState: number) => {
    setTeamUserState(newState);
  };

  const handleTimeFrameToggle = (newState: boolean) => {
    setTimeFrameState(newState);
  };

  // Figure out what kind of graph should be displayed
  const determineGraphState = () => {
    if (teamUserState === 0 && timeFrameState === true) {
      // Display single line graph (2)
      setGraphState(2);
    } else if (teamUserState === 0) {
      // Display progress bar (0)
      setGraphState(0);
    } else if (teamUserState === 1 && timeFrameState === true) {
      // Display multi-line line graph (2)
      setGraphState(2);
    } else if (teamUserState === 1) {
      // Display bar chart (1)
      setGraphState(1);
    } else {
      // Display no graph (-1)
      setGraphState(-1);
    }
  };

  // Call function as soon as hooks (teamUserState and timeFrameState) are done updating
  useEffect(() => {
    determineGraphState();
  });

<<<<<<< Updated upstream
  let members = useTeamMembers("Olivia");
  console.log(members);

=======
>>>>>>> Stashed changes
  return (
    <div className="tlm container text-center">
      <div className="row">
        <div className="col">
          <TeamUserList onSelectTeamUser={handleTeamUser} />
        </div>
        <div className="col">
          <GraphContainer graphState={graphState} />
          <TimeFrameContainer onToggleTimeFrame={handleTimeFrameToggle} />
        </div>
      </div>
    </div>
  );
}

export default DataAnalyticsWindow;
