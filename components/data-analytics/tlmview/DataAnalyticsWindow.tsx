/**
 *
 * @author Olivia Gray
 *
 * @description puts all tlm components together to create the view for team leaders and managers
 *
 */

import { use, useEffect, useState } from "react";
import GraphContainer from "./graph/GraphContainer";
import TeamUserList from "./teamuserlists/TeamUserList";
import TimeFrameContainer from "./timeframe/TimeFrameContainer";
import axios from "axios";

function DataAnalyticsWindow() {
  const [teams, setTeams] = useState();
  const [members, setMembers] = useState();
  const [teamUserState, setTeamUserState] = useState(-1);
  const [selectedTeams, setSelectedTeams] = useState<boolean[] | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<boolean[][] | null>(null);
  const [timeFrameState, setTimeFrameState] = useState(false);
  const [graphState, setGraphState] = useState(-1);
  const [performanceData, setPerformanceData] = useState<any | null>(null);

  // Get the currently logged in user

  // DYNAMICALLY LOADING THE PAGE
  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    // Change graph state when selectedUsers or selectedTeams or timeFrameToggle changes
    determineGraphState();
    // Also load performance data
    loadPerformanceData();
  });

  async function loadData() {
    axios
      .post("api/analysis/getTeamIDs", {
        leaderID: "Olivia",
      })
      .then((responseIDs) => {
        axios
          .post("api/analysis/getTeams", {
            teamID: responseIDs.data,
          })
          .then((responseTeams) => {
            //console.log(responseTeams.data);
            setTeams(responseTeams.data);
            axios
              .post("api/analysis/getTeamMembers", {
                teamID: responseIDs.data,
              })
              .then((responseMembers) => {
                //console.log(responseMembers.data);
                setMembers(responseMembers.data);
              });
          });
      });
  }

  async function loadPerformanceData() {
    //console.log("Performancing");
    if (graphState === 0 && selectedTeams?.includes(true)) {
      // Get a single team's performance
    } else if (graphState === 0) {
      // Get a single employee's performance
      axios
        .post("api/analysis/getUserPerformanceMetrics", {
          userIDs: ["Anna"],
        })
        .then((response) => {
          console.log(response.data);
          setPerformanceData(response.data);
        });
    }
  }

  // handler events
  const handleTeamUser = (newState: number) => {
    setTeamUserState(newState);
  };

  const handleRecievedTeamUser = (
    selectedTeams: boolean[],
    selectedUsers: boolean[][]
  ) => {
    setSelectedUsers(selectedUsers);
    setSelectedTeams(selectedTeams);

    console.log(selectedTeams);
    console.log(selectedUsers);
  };

  const handleTimeFrameToggle = (newState: boolean) => {
    setTimeFrameState(newState);
  };

  // Figure out what kind of graph should be displayed
  const determineGraphState = () => {
    //console.log("graphing");
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

  return (
    <div className="tlm container text-center">
      <div className="row">
        <div className="col">
          <TeamUserList
            teams={teams ? teams : []}
            users={members ? members : []}
            onSelectTeamUser={handleTeamUser}
            onSendTeamUser={handleRecievedTeamUser}
          />
        </div>
        <div className="col">
          <GraphContainer graphState={graphState} data={performanceData} />
          <TimeFrameContainer onToggleTimeFrame={handleTimeFrameToggle} />
        </div>
      </div>
    </div>
  );
}

export default DataAnalyticsWindow;
