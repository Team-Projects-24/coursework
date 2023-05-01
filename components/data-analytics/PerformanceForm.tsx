import React, { FormEvent, useState } from "react";
import { TextField, Autocomplete, Box, Grid, Typography, FormControl, Button } from "@mui/material";

const hardcodedTasks = ["task1", "task twoo", "tasks four", "3 - third", "9ine"];

export default function PerformanceForm() {
    const [selectedName, setSelectedName] = useState<string>("");

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedName(event.target.value);
    };

    const handleNameSelect = (
        event: React.ChangeEvent<{}>,
        value: string | null | undefined
    ) => {
        if (value) {
            setSelectedName(value);
        }
    };

    const filteredNames = hardcodedTasks.filter((name) =>
        name.toLowerCase().includes(selectedName.toLowerCase())
    );

    function handleSubmit(event: FormEvent<HTMLFormElement>) { 
        event.preventDefault();

        if (true) {
            console.log("use api to update performance log");
        }
    }


    return (
        // <Box sx={{ margin: 'auto', maxWidth: 600 }}>


        //     <Typography variant="h4" sx={{ textAlign: 'center', bgcolor: '#ffbf00', color: 'white', p: 2, borderRadius: 5 }}>
        //         Enter Performance Data
        //     </Typography>

        //     <FormControl sx={{ my: 2 }}>
        //         <Grid item xs={12} sm={6} spacing={2} margin={5}>

        //             <Autocomplete
        //                 id="name-select"
        //                 options={filteredNames}
        //                 value={selectedName}
        //                 onChange={handleNameSelect}
        //                 renderInput={(params) => (
        //                     <TextField
        //                         {...params}
        //                         label="Search for a task or taskID"
        //                         variant="outlined"
        //                         onChange={handleNameChange}
        //                     />
        //                 )}
        //             />
        //         </Grid>
        //         <Grid item xs={12} sm={6} spacing={2} margin={5}>
        //             <TextField
        //                 fullWidth
        //                 name="man_hours"
        //                 label="Man Hours"
        //                 type="number"
        //                 placeholder="Enter the number of man-hours you've completed"
        //                 onSubmit={handleSubmit}
        //             />
        //         </Grid>

        //         <Button type="submit" variant="contained" color="primary">
        //             Submit
        //         </Button>

//     </FormControl>
        // </Box>

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
                            id="search-name"
                            options={filteredNames}
                            getOptionLabel={(name) => name}
                            style={{ width: 300 }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Search for a name"
                                    variant="outlined"
                                    onChange={handleNameChange}
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
