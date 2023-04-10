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
import { useTeams } from "hooks/analysis/useTeams";
import { ITeam } from "types/analysis/Team.d";
import { IEmployee } from "types/analysis/Employee.d";

function DataAnalyticsWindow() {
  const [teamUserState, setTeamUserState] = useState(-1);
  const [timeFrameState, setTimeFrameState] = useState(false);
  const [graphState, setGraphState] = useState(-1);

  const handleTeamUser = (newState: number) => {
    setTeamUserState(newState);
  };

  const handleTimeFrameToggle = (newState: boolean) => {
    setTimeFrameState(newState);
  };

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

  let teams = useTeams("1").teams;
  console.log(teams);

  let members = useTeamMembers("Olivia").members;
  console.log(members);

  return (
    <div className="tlm container text-center">
      <div className="row">
        <div className="col">
          <TeamUserList
            teams={teams ? teams : []}
            users={members ? members : []}
            onSelectTeamUser={handleTeamUser}
          />
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
