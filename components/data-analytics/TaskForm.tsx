

import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { ChangeEvent, FormEvent, useState } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';

interface Task {
    task_id: number;
    name: string;
    description: string;
    start_date: string;
    due_date: string;
    man_hours: number;
    completed_man_hours: number;
}

const hardcodedTasks: Task[] = [
    {
        task_id: 1,
        name: 'Task 1',
        description: 'This is the first task',
        start_date: '2022-01-01',
        due_date: '2022-01-31',
        man_hours: 40,
        completed_man_hours: 20,
    },
    {
        task_id: 2,
        name: 'Task 2',
        description: 'This is the second task',
        start_date: '2022-02-01',
        due_date: '2022-02-28',
        man_hours: 80,
        completed_man_hours: 60,
    },
    {
        task_id: 3,
        name: 'Task 3',
        description: 'This is the third task',
        start_date: '2022-03-01',
        due_date: '2022-03-31',
        man_hours: 120,
        completed_man_hours: 100,
    },
];

export function TaskForm() {
    const [selectedTaskId, setSelectedTaskId] = useState('');
    const [selectedTask, setSelectedTask] = useState<Task | undefined>();
    const [selectedTaskHTML, setSelectedTaskHTML] = useState<HTMLSelectElement>();
    function handleTaskSelection(event: SelectChangeEvent<HTMLSelectElement>) {
        const taskIds = event.target.value as string;
        const taskId = event.target.value as HTMLSelectElement;

        const task = hardcodedTasks.find((t) => t.task_id.toString() === taskIds);
        
        setSelectedTaskId(taskIds);
        setSelectedTask(task);
        setSelectedTaskHTML(taskId);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        if (!selectedTask) {
            return;
        }

        const { name, value } = event.target;
        setSelectedTask((prevTask) => ({
            ...prevTask,
            [name]: value,
        }) as Task);
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!selectedTask) {
            return;
        }

        console.log('Updating task:', selectedTask);
    }

    // code for navigating to the admin page
    // const handleAdminClick = () => {
    //     history.push("/admin");
    // };

    return (
      <Box sx={{ margin: 'auto', maxWidth: 600 }}>
        <Typography variant="h4" sx={{ textAlign: 'center', bgcolor: '#ffbf00', color: 'white', p: 2, borderRadius: 5 }}>
          Task Form
        </Typography>
        <FormControl sx={{ my: 2 }}>
          <InputLabel id="task-select-label">Select a task</InputLabel>
          <Select
            labelId="task-select-label"
            id="task-select"
            value={selectedTaskHTML}
            label="Select a task"
            onChange={handleTaskSelection}
          >
            <MenuItem value="Select a Task">
              <em>Select a task</em>
            </MenuItem>
            {hardcodedTasks.map((task) => (
              <MenuItem key={task.task_id} value={task.task_id.toString()}>
                {task.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {selectedTask && (
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2} sx={{ my: 2 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="name"
                  label="Name"
                  value={selectedTask.name}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="description"
                  label="Description"
                  value={selectedTask.description}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="start_date"
                  label="Start date"
                  type="date"
                  value={selectedTask.start_date}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="due_date"
                  label="Due date"
                  type="date"
                  value={selectedTask.due_date}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="man_hours"
                  label="Man hours"
                  type="number"
                  value={selectedTask.man_hours}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="completed_man_hours"
                  label="Completed man hours"
                  type="number"
                  value={selectedTask.completed_man_hours}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Update task
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
    );
    

}

export default TaskForm;