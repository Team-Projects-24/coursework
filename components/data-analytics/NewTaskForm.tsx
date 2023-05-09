import React, { FormEvent, useEffect, useState } from "react";
import { TextField, Autocomplete, Box, Grid, Typography, FormControl, Button } from "@mui/material";
import axios from "axios";



const hardcodedTeams = ["Team A", "Team B", "Team C"];
const hardcodedUsers = ["User 1", "User 2", "User 3"];



export default function NewTaskForm() {
    const [selectedTeam, setSelectedTeam] = useState<{ teamId: string; name: string } | null>(null);
    const [selectedUser, setSelectedUser] = useState<{ userId: string; name: string } | null>(null);
    const [taskName, setTaskName] = useState<string>("");
    const [deadline, setDeadline] = useState<string>("");
    const [estimatedManHours, setEstimatedManHours] = useState<number>(0);

    const [users, setUsers] = useState<Array<{ userId: string, name: string }>>([]);
    const [teams, setTeams] = useState<Array<{ teamId: string, name: string }>>([]);


    const [userText, setUserText] = useState<{ userId: string; name: string } | null>(null)
    const [teamText, setTeamText] = useState<{ teamId: string; name: string } | null>(null);



    const handleTeamChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("handle team change called");
        setTeamText({ teamId: '', name: event.target.value });
        // console.log(selectedTeam);
    };

    const handleTeamSelect = (

        event: React.ChangeEvent<{}>,
        value: { teamId: string; name: string }
    ) => {
        if (value) {
            setSelectedTeam(value);
            setTeamText(value);
            // console.log(selectedTeam);

        } else {
            setSelectedTeam(null);
        }
    };

    const handleUserChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("handle user change called");
        setUserText({ userId: '', name: event.target.value });
        // console.log(selectedUser);
    };

    const handleUserSelect = (

        event: React.ChangeEvent<{}>,
        value: { userId: string; name: string }
    ) => {
        if (value) {
            setSelectedUser(value);
            setUserText(value);
            // console.log(selectedUser);
        } else {
            setSelectedUser(null);
        }
    };

    useEffect(() => {
        console.log("selectedTeam set as: ", selectedTeam);
        console.log("selectedUser set as: ", selectedUser);


    }, [selectedUser, selectedTeam]);


    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        // Use API to create a new task here
        console.log("Use API to create a new task");


        console.log(selectedTeam?.teamId);
        console.log(selectedUser?.userId);

        if (selectedTeam && selectedUser) {
            createTask(selectedTeam?.teamId, selectedUser?.userId, taskName, deadline, estimatedManHours); //GPT - I NEED TO CREATE THE API AND FUNCTION FOR THIS

            // createPerformanceEntry() // INITIALISE THE PERFORAMNCE LOG FOR THIS TASK
        } else {
            console.error("please select a team and user");
        }
    }



    useEffect(() => {
        fetchUsers();
        fetchTeams();
    }, []);





    async function fetchUsers() {
        try {
            const response = await fetch('/api/admin/getAllUsers');
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }

    async function fetchTeams() {
        try {
            const response = await fetch('/api/admin/getAllTeams');
            const data = await response.json();
            setTeams(data);
        } catch (error) {
            console.error('Error fetching teams:', error);
        }
    }




    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(userText?.name.toLowerCase() || "")
    );

    const filteredTeams = teams.filter((team) =>
        team.name.toLowerCase().includes(teamText?.name.toLowerCase() || "")
    );



    async function createTask(teamId: any, userId: any, taskName: any, deadline: any, estimatedManHours: any) {
        try {
            const response = await axios.post("/api/admin/createTask", {
                teamId,
                userId,
                taskName,
                deadline,
                estimatedManHours,
            });

            console.log("Task created:", response.data);
        } catch (error) {
            console.error("Error creating task:", error);
        }
    }




    return (
        <Box sx={{ margin: 'auto', maxWidth: 600 }}>
            <Typography variant="h4" sx={{ textAlign: 'center', bgcolor: '#ffbf00', color: 'white', p: 2, borderRadius: 5 }}>
                New Task Form
            </Typography>

            <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={2} sx={{ my: 2 }}>
                    <Grid item xs={12}>
                        <Autocomplete
                            value={teamText}
                            onChange={handleTeamSelect}
                            inputValue={teamText?.name || ""} // not sure if this needs switching
                            onInputChange={(_, value) => handleTeamChange({ target: { value } } as any)}
                            id="team-select"
                            options={filteredTeams}
                            getOptionLabel={(team) => team.name}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Select Team"
                                    variant="outlined"
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Autocomplete
                            value={userText}
                            onChange={handleUserSelect}
                            inputValue={userText?.name || ""}
                            onInputChange={(_, value) => handleUserChange({ target: { value } } as any)}
                            id="user-select"
                            options={filteredUsers}
                            getOptionLabel={(user) => user.name}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Select User"
                                    variant="outlined"
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            name="task-name"
                            label="Task Name"
                            value={taskName}
                            onChange={(e) => setTaskName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            name="deadline"
                            label=""
                            type="date"
                            // InputLabelProps={{ shrink: true }}
                            InputProps={{ inputProps: { min: new Date().toISOString().split("T")[0] } }}
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            name="estimated-man-hours"
                            label="Estimated Man Hours"
                            type="number"
                            value={estimatedManHours}
                            onChange={(e) => setEstimatedManHours(parseFloat(e.target.value))}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary">
                            Create Task
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

