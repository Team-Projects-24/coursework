import React, { FormEvent, useEffect, useState } from "react";
import {
  TextField,
  Autocomplete,
  Box,
  Grid,
  Typography,
  FormControl,
  Button,
} from "@mui/material";
import axios from "axios";

const hardcodedTasks = [
  "task1",
  "task twoo",
  "tasks four",
  "3 - third",
  "9ine",
];

export default function PerformanceForm() {
  // const [selectedName, setSelectedName] = useState<string>("");
  const [selectedName, setSelectedName] = useState<{
    taskId: string;
    name: string;
  } | null>(null);

  const [selectedTask, setSelectedTask] = useState<{
    taskId: string;
    name: string;
    manHoursSet?: number;
  } | null>(null);

  const [tasks, setTasks] = useState<
    Array<{ taskId: string; name: string; manHoursSet: number }>
  >([]); // ADAPT TO ALSO HAVE MAN HOURS SET TO USE IN PF LOG ENTRY

  const [manHoursCompleted, setManHoursCompleted] = useState<number | null>(
    null
  );
  const HARDCODEDMANHOURSSET = 8000; // can remove this once the task has the number of set hours with it

  const [manHoursCap, setManHoursCap] = useState<number | null>(null);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handle name change called");
    setSelectedName({ taskId: "", name: event.target.value });
  };

  const handleNameSelect = (
    event: React.ChangeEvent<{}>,
    value: { taskId: string; name: string; manHoursSet?: number } | null // remove question mark if setselectedtask isn't working properly
  ) => {
    if (value) {
      setSelectedName(value);
      setSelectedTask(value.manHoursSet ? value : null);

      // do api call and set the cap
    } else {
      setSelectedTask(null);
    }
  };

  const filteredNames = tasks.filter((task) =>
    task.name.toLowerCase().includes(selectedName?.name.toLowerCase() || "")
  );

  useEffect(() => {
    console.log("selectedName set as: ", selectedName);
    console.log("selectedTask set as: ", selectedTask);
  }, [selectedName, selectedTask]);

  const updateTaskCompletedHours = async (
    taskId: string,
    additionalHours: number
  ) => {
    try {
      const response = await axios.put(
        `/api/admin/updateCompletedHours?id=${taskId}`,
        {
          additionalHours,
        }
      );
      console.log("Updated task:", response.data);
    } catch (error) {
      console.error(
        "Error updating task:",
        error.response?.data || error.message
      );
    }
  };

  const createPerformanceEntry = async (
    taskId: string,
    manHoursSet: number,
    manHoursCompleted: number
  ) => {
    try {
      const response = await axios.post("/api/admin/newPerformanceEntry", {
        taskId,
        manHoursSet,
        manHoursCompleted,
      });
      console.log("New performance entry created:", response.data);

      setSelectedName(null);
      setManHoursCompleted(null);
    } catch (error) {
      console.error(
        "ERROR creating performance entry:",
        error.response?.data || error.message
      );
    }
  };

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (selectedTask && manHoursCompleted !== null) {
      console.log("use api to update performance log");

      // console.log(selectedName);

      console.log("selected task man hours set is" + selectedTask.manHoursSet);
      createPerformanceEntry(
        selectedTask.taskId,
        selectedTask.manHoursSet,
        manHoursCompleted
      ); // commented just for debugging

      //UPDATE THE TASK WITH THE NEW AMOUNT OF COMPLETED HOURS

      updateTaskCompletedHours(selectedTask.taskId, manHoursCompleted);
    } else {
      console.log("one of man hours or selected task is null");
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

  const fetchTask = async (taskId: number) => {
    try {
      const response = await axios.post("/api/admin/getTask", {
        taskId: taskId,
      });
      // setTasks(response.data);

      let totalMH = response.data.manHoursSet;
      let completedMH = response.data.manHoursCompleted;

      setManHoursCap(totalMH - completedMH);

      console.log("Fetched tasks:", response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  return (
    <Box sx={{ margin: "auto", maxWidth: 600 }}>
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          bgcolor: "#ffbf00",
          color: "white",
          p: 2,
          borderRadius: 5,
        }}
      >
        Performance Log Form
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2} sx={{ my: 2 }}>
          <Grid item xs={12}>
            <Autocomplete
              value={selectedName}
              onChange={handleNameSelect}
              inputValue={selectedName?.name || ""}
              onInputChange={(_, value) =>
                handleNameChange({ target: { value } } as any)
              }
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
              onChange={(event) => {
                if (manHoursCap !== null) {
                  if (Number(event.target.value) <= manHoursCap) {
                    setManHoursCompleted(Number(event.target.value));
                  } else {
                    alert("invalid amount of hours");
                  }
                } else {
                  alert("Man hours cap not set");
                }
              }}
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
