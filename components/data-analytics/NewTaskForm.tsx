import React, { FormEvent, useEffect, useState } from "react";
import { TextField, Autocomplete, Box, Grid, Typography, FormControl, Button } from "@mui/material";
import axios from "axios";



export default function NewTaskForm() {
    const [selectedTeam, setSelectedTeam] = useState<{ id: string; name: string } | null>(null);
    const [selectedUser, setSelectedUser] = useState<{ userId: string; name: string } | null>(null);


    const [taskName, setTaskName] = useState<string>("");
    const [deadline, setDeadline] = useState<Date>();
    const [estimatedManHours, setEstimatedManHours] = useState<number>(0);

    const [users, setUsers] = useState<Array<{ userId: string, name: string }>>([]);
    const [teams, setTeams] = useState<Array<{ id: string, name: string }>>([]);


    const [userText, setUserText] = useState<{ userId: string; name: string } | null>(null)
    const [teamText, setTeamText] = useState<{ id: string; name: string } | null>(null);


    const [userId, setUserId] = useState<string>();
    const [teamId, setTeamId] = useState<string>();


    const [submitted, setSubmitted] = useState<boolean>(false);




    const handleUserChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("handle user change called");
        setUserText({ userId: '', name: event.target.value });

    };

    const handleUserSelect = (

        event: React.ChangeEvent<{}>,
        value: { userId: string; name: string } | null
    ) => {
        if (value) {
            setSelectedUser(value);
            setUserText(value);
            // console.log(selectedUser);
        } else {
            setSelectedUser(null);
        }
    };



    const handleTeamChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("handle user change called");
        setTeamText({ id: '', name: event.target.value });

    };

    const handleTeamSelect = (

        event: React.ChangeEvent<{}>,
        value: { id: string; name: string } | null
    ) => {
        if (value) {
            setSelectedTeam(value);
            setTeamText(value);
            // console.log(selectedUser);
        } else {
            setSelectedUser(null);
        }
    };


    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        // Use API to create a new task here
        console.log("Use API to create a new task");

        setSubmitted(true);

        // const teamId = "1";
        // const userId = "Ade";
        const deadline2 = new Date("01-02-2003");
        // const name = "TESTTTTTT";
        // const manHoursSet = 3;



        console.log(deadline);
        console.log(deadline2);

        console.log(selectedTeam?.id);
        if (selectedTeam && selectedUser && deadline) {

            console.log(selectedTeam.id);

            createTask(selectedTeam.id, estimatedManHours, selectedUser.userId, deadline2, taskName);

        } else {
            console.log("ashdf;jasld;fjl;sjdflas;dlfasljdf");
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
            console.log("fetched users: ", data);
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }

    async function fetchTeams() {
        try {
            const response = await fetch('/api/admin/getAllTeams');
            const data = await response.json();
            console.log("fetched teams: ", data);
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



    const createTask = async (teamId: string, manHoursSet: number, userId: string, deadline: Date, name: string) => {
        try {
            const response = await axios.post('/api/admin/createTask', {
                teamId,
                manHoursSet,
                userId,
                deadline,
                name,
                manHoursCompleted: "0",
            })
            console.log('New task entry created:', response.data)

            // setSelectedName(null);
            // setManHoursCompleted(null);

        } catch (error) {
            console.error('ERROR creating task entry:', error.response?.data || error.message)
        }
    }



    useEffect(() => {
        if (selectedUser) {
            console.log("hereis the user");
            console.log(selectedUser.userId);
            setUserId(selectedUser.userId);
        }
    }, [selectedUser]);

    useEffect(() => {
        if (selectedTeam) {
            console.log("here is the team id");
            console.log(selectedTeam.id); // this is returning 'undefined'. why is that, GPT?

        }
    }, [selectedTeam]);

    function formatDate(date: Date | undefined): string {
        if (!date) {
          return '';
        }
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
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
                            value={formatDate(deadline)}
                            onChange={(e) => setDeadline(new Date(e.target.value))}
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

