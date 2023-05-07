import React, { FormEvent, useState } from "react";
import { TextField, Autocomplete, Box, Grid, Typography, FormControl, Button } from "@mui/material";
import axios from "axios";



const hardcodedTeams = ["Team A", "Team B", "Team C"];
const hardcodedUsers = ["User 1", "User 2", "User 3"];

export default function NewTaskForm() {
    const [selectedTeam, setSelectedTeam] = useState<string>("");
    const [selectedUser, setSelectedUser] = useState<string>("");
    const [taskName, setTaskName] = useState<string>("");
    const [deadline, setDeadline] = useState<string>("");
    const [estimatedManHours, setEstimatedManHours] = useState<number>(0);

    const handleTeamSelect = (
        event: React.ChangeEvent<{}>,
        value: string | null | undefined
    ) => {
        if (value) {
            setSelectedTeam(value);
        }
    };

    const handleUserSelect = (
        event: React.ChangeEvent<{}>,
        value: string | null | undefined
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
                            id="team-select"
                            options={hardcodedTeams}
                            getOptionLabel={(team) => team}
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
                            id="user-select"
                            options={hardcodedUsers}
                            getOptionLabel={(user) => user}
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

