import React, { FormEvent, useEffect, useState } from "react";
import { TextField, Autocomplete, Box, Grid, Typography, FormControl, Button } from "@mui/material";
import axios from "axios";

const hardcodedTasks = ["task1", "task twoo", "tasks four", "3 - third", "9ine"];

export default function PerformanceForm() {
    // const [selectedName, setSelectedName] = useState<string>("");
    const [selectedName, setSelectedName] = useState<{ taskId: string; name: string} | null>(null);

    const [selectedTask, setSelectedTask] =  useState<{ taskId: string; name: string, manHoursSet: number} | null>(null);

    const [tasks, setTasks] = useState<Array<{ taskId: string, name: string , manHoursSet: number}>>([]); // ADAPT TO ALSO HAVE MAN HOURS SET TO USE IN PF LOG ENTRY

    const [manHoursCompleted, setManHoursCompleted] = useState<number | null>(null);
    const HARDCODEDMANHOURSSET = 8000; // can remove this once the task has the number of set hours with it 


    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("handle name change called");
        setSelectedName({ taskId: '', name: event.target.value}); // , manHoursSet: 8000
    };

    const handleNameSelect = (
        
        event: React.ChangeEvent<{}>,
        value: { taskId: string; name: string} | null
    ) => {
        if (value) {
            console.log(value);
            console.log("above is value being set to selected name");
            setSelectedName(value);

            console.log(selectedName);

            setSelectedTask(value);
            console.log("below is selectedTask")
            
            console.log(selectedTask);
            
            console.log("below is man hours set for selectedName")
            console.log(selectedName?.manHoursSet); // why is this undefined when selectedName value is     
        }
    };

    const filteredNames = tasks.filter((task) =>
        task.name.toLowerCase().includes(selectedName?.name.toLowerCase() || "")
    );



    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (selectedName && manHoursCompleted !== null) {
            console.log("use api to update performance log");

            // task, task ID, date (but would be now by default), man hours set, man hours completed

            const createPerformanceEntry = async (taskId: string,  manHoursSet: number, manHoursCompleted: number) => {
                try {
                    const response = await axios.post('/api/admin/newPerformanceEntry', {
                        taskId,
                        manHoursSet,
                        manHoursCompleted,
                    })
                    console.log('New performance entry created:', response.data)

                    setSelectedName(null);
                    setManHoursCompleted(null);

                } catch (error) {
                    console.error('ERROR creating performance entry:', error.response?.data || error.message)
                }
            }

            


            console.log(selectedName);




            createPerformanceEntry(selectedName.taskId, HARDCODEDMANHOURSSET, manHoursCompleted)



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
                            type="number"
                            value={manHoursCompleted || ""}
                            onChange={(event) => setManHoursCompleted(Number(event.target.value))}
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
