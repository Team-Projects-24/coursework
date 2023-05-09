import React, { FormEvent, useEffect, useState } from "react";
import { TextField, Autocomplete, Box, Grid, Typography, FormControl, Button } from "@mui/material";
import axios from "axios";



const hardcodedTeams = ["Team A", "Team B", "Team C"];
const hardcodedUsers = ["User 1", "User 2", "User 3"];

export default function NewTaskForm() {
    const [selectedTeam, setSelectedTeam] = useState<{ teamId: string; name: string} | null>(null);;
    const [selectedUser, setSelectedUser] = useState<{ userId: string; name: string} | null>(null);;
    const [taskName, setTaskName] = useState<string>("");
    const [deadline, setDeadline] = useState<string>("");
    const [estimatedManHours, setEstimatedManHours] = useState<number>(0);

    const [users, setUsers] = useState<Array<{ userId: string, name: string}>>([]);
    const [teams, setTeams] = useState<Array<{ teamId: string, name: string}>>([]);



    const handleTeamChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("handle team change called");
        setSelectedTeam({ teamId: '', name: event.target.value}); 
    };

    const handleTeamSelect = (

        event: React.ChangeEvent<{}>,
        value: {teamId: string; name: string }
    ) => {
        if (value) {
            setSelectedTeam(value);
        }
    };

    const handleUserChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("handle user change called");
        setSelectedUser({ userId: '', name: event.target.value}); 
    };

     const handleUserSelect = (

        event: React.ChangeEvent<{}>,
        value: {userId: string; name: string }
    ) => {
        if (value) {
            setSelectedUser(value);
        }
    };

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        // Use API to create a new task here
        console.log("Use API to create a new task");
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
        user.name.toLowerCase().includes(selectedUser?.name.toLowerCase() || "")
    );

    const filteredTeams = teams.filter((team) =>
        team.name.toLowerCase().includes(selectedTeam?.name.toLowerCase() || "")
    );



    return (
        <Box sx={{ margin: 'auto', maxWidth: 600 }}>
            <Typography variant="h4" sx={{ textAlign: 'center', bgcolor: '#ffbf00', color: 'white', p: 2, borderRadius: 5 }}>
                New Task Form
            </Typography>

            <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={2} sx={{ my: 2 }}>
                    <Grid item xs={12}>
                        <Autocomplete
                            value={selectedTeam}
                            onChange={handleTeamSelect}
                            inputValue={selectedTeam?.name || ""}
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
                            value={selectedUser}
                            onChange={handleUserSelect}
                            inputValue={selectedUser?.name || ""}
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

