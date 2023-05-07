import React, { FormEvent, useEffect, useState } from "react";
import { TextField, Autocomplete, Box, Grid, Typography, FormControl, Button } from "@mui/material";
import axios from "axios";

const hardcodedTasks = ["task1", "task twoo", "tasks four", "3 - third", "9ine"];

export default function PerformanceForm() {
    // const [selectedName, setSelectedName] = useState<string>("");
    const [selectedName, setSelectedName] = useState<{ taskId: string; name: string } | null>(null);



    const [tasks, setTasks] = useState<Array<{ taskId: string, name: string }>>([]);



    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedName({ taskId: '', name: event.target.value });
    };

    const handleNameSelect = (
        event: React.ChangeEvent<{}>,
        value: { taskId: string; name: string } | null
    ) => {
        if (value) {
            setSelectedName(value);
        }
    };

    const filteredNames = tasks.filter((task) =>
        task.name.toLowerCase().includes(selectedName?.name.toLowerCase() || "")
    );


    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (true) {
            console.log("use api to update performance log");
        }
    }



    const fetchTasks = async () => {
        try {
            const response = await axios.get("/api/admin/getTaskIDs");
            setTasks(response.data);
            console.log("Fetched tasks:", response.data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);



    return (

        <Box sx={{ margin: 'auto', maxWidth: 600 }}>



            <Typography variant="h4" sx={{ textAlign: 'center', bgcolor: '#ffbf00', color: 'white', p: 2, borderRadius: 5 }}>
                Performance Log Form
            </Typography>

            <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={2} sx={{ my: 2 }}>
                    <Grid item xs={12}>
                        <Autocomplete
                            value={selectedName}
                            onChange={handleNameSelect}
                            inputValue={selectedName?.name || ""}
                            onInputChange={(_, value) => handleNameChange({ target: { value } } as any)}
                            id="search-name"
                            options={filteredNames}
                            getOptionLabel={(task) => task.name}
                            style={{ width: 300 }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Search for a name"
                                    variant="outlined"
                                // onChange={handleNameChange}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            name="Man-Hours"
                            label="Man-Hours Completed"
                            placeholder="man hours you've completed"
                            type='number'
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary">
                            Update task
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>



    );
}
