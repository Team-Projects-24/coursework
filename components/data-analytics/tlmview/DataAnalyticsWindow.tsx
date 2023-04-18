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
import { getLinearProgressUtilityClass } from "@mui/material";

function DataAnalyticsWindow() {
  const [teams, setTeams] = useState();
  const [members, setMembers] = useState<any>();
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
    /*
    const getSelectedUserIDs = () => {
      // Compare selectedUsers to users
      console.log(selectedUsers);
      console.log(members);
      if (selectedUsers && members) {
        let selectedUserInfo: any = [];
        for (let i = 0; i < selectedUsers?.length; i++) {
          for (let j = 0; j < selectedUsers?.[i]?.length; i++) {
            console.log(selectedUsers[i][j]);
            if (selectedUsers[i][j]) {
              console.log("found match");
              selectedUserInfo.push(members[i][j].userID);
            }
          }
        }
        return selectedUserInfo;
      }
    };
    */

    //console.log("Performancing");
    if (graphState === 0 && selectedTeams?.includes(true)) {
      // Get a single team's performance
      axios
        .post("api/analysis/getTeamPerformanceMetrics", {
          teamIDs: [1],
        })
        .then((response) => {
          console.log(response.data);
          setPerformanceData(response.data);
        });
    } else if (graphState === 0) {
      // Get a single employee's performance
      //let requestedUsers = getSelectedUserIDs();
      //console.log(requestedUsers);
      axios
        .post("api/analysis/getUserPerformanceMetrics", {
          userIDs: ["Anna"],
        })
        .then((response) => {
          console.log(response.data);
          setPerformanceData(response.data);
        });
    } else if (graphState === 1 && selectedTeams?.includes(true)) {
      // Compare teams in a bar chart
      axios
        .post("api/analysis/getTeamPerformanceMetrics", {
          teamIDs: [1, 3],
        })
        .then((response) => {
          console.log(response.data);
          setPerformanceData(response.data);
        });
    } else if (graphState === 1) {
      // Compare users in a bar chart
      axios
        .post("api/analysis/getUserPerformanceMetrics", {
          userIDs: ["Anna", "Jonathan"],
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

    // If graph state has changed, then load performance data
    loadPerformanceData();
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
