/**
 *
 * @author Olivia Gray, Euan Hall (Individual view)
 *
 * @description puts all tlm components together to create the view for team leaders and managers
 *
 */

import { use, useEffect, useState } from "react";
import GraphContainer from "./graph/GraphContainer";
import TeamUserList from "./teamuserlists/TeamUserList";
import TimeFrameContainer from "./timeframe/TimeFrameContainer";
import useUserStore from "stores/userStore";
import axios from "axios";

export default function DataAnalyticsWindow() {
  const [teams, setTeams] = useState();
  const [members, setMembers] = useState<any>();
  const [teamUserState, setTeamUserState] = useState(-1);
  const [selectedTeams, setSelectedTeams] = useState<boolean[] | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<boolean[][] | null>(null);
  const [selectedTeamIDs, setSelectedTeamIDs] = useState<number[]>([]);
  const [selectedUserIDs, setSelectedUserIDs] = useState<String[]>([]);
  const [timeFrameState, setTimeFrameState] = useState(false);
  const [timeFrame, setTimeFrame] = useState("day");
  const [graphState, setGraphState] = useState(-1);
  const [performanceData, setPerformanceData] = useState<any | null>(null);

  const { user, setUser } = useUserStore();
  const loggedInUserID = user?.userId;
  const loggedInUserRole = user?.role;

  // Get the currently logged in user
  // DYNAMICALLY LOADING THE PAGE
  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    // Change graph state when selectedUsers or selectedTeams or timeFrameToggle changes
    //determineGraphState();
  });

  async function loadData() {
    axios
      .post("api/analysis/getTeamIDs", {
        leaderID: loggedInUserID,
        role: loggedInUserRole,
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

  async function loadPerformanceData(
    teamInputs: number[],
    userInputs: String[],
    timeFrameState: boolean,
    timeFrame: String
  ) {
    console.log("getting performance data");
    console.log(teamInputs);
    console.log(userInputs);
    console.log(timeFrameState);
    console.log(timeFrame);
    if (teamInputs.length === 1 && !timeFrameState) {
      // Get a single team's performance
      console.log("single team");
      setGraphState(0);
      axios
        .post("api/analysis/getTeamPerformanceMetrics", {
          teamIDs: teamInputs,
        })
        .then((response) => {
          //console.log(response.data);
          setPerformanceData(response.data);
        });
    } else if (userInputs.length === 1 && !timeFrameState) {
      console.log("single user");
      setGraphState(0);
      // Get a single employee's performance
      //let requestedUsers = getSelectedUserIDs();
      //console.log(requestedUsers);
      axios
        .post("api/analysis/getUserPerformanceMetrics", {
          userIDs: userInputs,
        })
        .then((response) => {
          //console.log(response.data);
          setPerformanceData(response.data);
        });
    } else if (teamInputs.length > 0 && !timeFrameState) {
      console.log("multiple teams");
      setGraphState(1);
      // Compare teams in a bar chart
      axios
        .post("api/analysis/getTeamPerformanceMetrics", {
          teamIDs: teamInputs,
        })
        .then((response) => {
          //console.log(response.data);
          setPerformanceData(response.data);
        });
    } else if (userInputs.length > 0 && !timeFrameState) {
      console.log("multiple users");
      setGraphState(1);
      // Compare users in a bar chart
      axios
        .post("api/analysis/getUserPerformanceMetrics", {
          userIDs: userInputs,
        })
        .then((response) => {
          //console.log(response.data);
          setPerformanceData(response.data);
        });
    } else if (teamInputs.length > 0 && timeFrameState) {
      console.log("line graph for teams");
      setGraphState(2);
      // View / display performance over a time period for teams
      axios
        .post("api/analysis/getTeamTimePerformanceMetrics", {
          teamIDs: teamInputs,
          timeframe: timeFrame,
        })
        .then((response) => {
          //console.log(response.data);
          setPerformanceData(response.data);
        });
    } else if (userInputs.length > 0 && timeFrameState) {
      console.log("line graph for users");
      setGraphState(2);
      // View / display performance over a time period for users
      axios
        .post("api/analysis/getUserTimePerformanceMetrics", {
          userIDs: userInputs,
          timeframe: timeFrame,
        })
        .then((response) => {
          //console.log(response.data);
          setPerformanceData(response.data);
        });
    } else {
      // Nothing selected
      console.log("nothing selected");
      setGraphState(-1);
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
    console.log(selectedTeams);

    if (selectedTeams.includes(true)) {
      let teamsInput: any[] = [];
      // Determine the corresponding teams from selectedTeams
      console.log(selectedTeams);
      for (let i = 0; i < selectedTeams.length; i++) {
        // If selectedTeams[i] is true then we want to get the performance data of this team
        if (selectedTeams[i]) {
          //console.log(teams?.[i]);
          teamsInput.push(teams?.[i]["teamID"]);
        }
      }
      console.log(teamsInput);
      setSelectedTeamIDs(teamsInput);
      setSelectedUserIDs([]);
      loadPerformanceData(teamsInput, [], timeFrameState, timeFrame);
    } else {
      let usersInput: any[] = [];
      // Determine the corresponding users from selectedUsers
      for (let i = 0; i < selectedUsers.length; i++) {
        for (let j = 0; j < selectedUsers[i].length; j++) {
          if (selectedUsers[i][j]) {
            usersInput.push(members?.[i]?.[j]["userID"]);
          }
        }
      }
      if (usersInput.length > 0) {
        // If any users have been selected
        console.log(usersInput);
        setSelectedTeamIDs([]);
        setSelectedUserIDs(usersInput);
        loadPerformanceData([], usersInput, timeFrameState, timeFrame);
      } else {
        // If no one has been selected
        setSelectedTeamIDs([]);
        setSelectedUserIDs([]);
        loadPerformanceData([], [], timeFrameState, timeFrame);
      }
    }
  };

  const handleTimeFrameToggle = (newState: boolean) => {
    setTimeFrameState(newState);
    loadPerformanceData(selectedTeamIDs, selectedUserIDs, newState, timeFrame);
  };

  const handleTimeFrameSlider = (newState: number) => {
    let timeframePeriod = "day";
    if (newState == 1) {
      timeframePeriod = "week";
    } else if (newState == 2) {
      timeframePeriod = "month";
    }
    setTimeFrame(timeframePeriod);
    loadPerformanceData(
      selectedTeamIDs,
      selectedUserIDs,
      timeFrameState,
      timeframePeriod
    );
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
          <TimeFrameContainer
            onToggleTimeFrame={handleTimeFrameToggle}
            onChangeTimeFrame={handleTimeFrameSlider}
          />
        </div>
      </div>
    </div>
  );
}
