


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





interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    position: string;
    department: string;
    completed: boolean;
}

const hardcodedEmployees: Employee[] = [
    {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
        position: 'Manager',
        department: 'Sales',
        completed: false,
    },
    {
        id: 2,
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'janedoe@example.com',
        position: 'Engineer',
        department: 'IT',
        completed: false,
    },
    {
        id: 3,
        firstName: 'Bob',
        lastName: 'Smith',
        email: 'bobsmith@example.com',
        position: 'Designer',
        department: 'Marketing',
        completed: false,
    },
];

export function EmployeeForm() {
    const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | undefined>();

    function handleEmployeeSelection(event: React.ChangeEvent<HTMLSelectElement>) {
        const employeeId = event.target.value;
        const employee = hardcodedEmployees.find((e) => e.id.toString() === employeeId);
        setSelectedEmployeeId(employeeId);
        setSelectedEmployee(employee);
    }

    function handleCheckboxChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (selectedEmployee) {
            setSelectedEmployee({
                ...selectedEmployee,
                completed: event.target.checked,
            });
        }
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (selectedEmployee) {
            console.log('Updating employee:', selectedEmployee);
        }
    }

    return (
        <div>
            <h2>Update Employee</h2>
            <label>
                Select an employee:
                <select value={selectedEmployeeId} onChange={handleEmployeeSelection}>
                    <option value="">Select an employee</option>
                    {hardcodedEmployees.map((employee) => (
                        <option key={employee.id} value={employee.id.toString()}>
                            {employee.firstName} {employee.lastName}
                        </option>
                    ))}
                </select>
            </label>
            {selectedEmployee && (
                <div>
                    <form onSubmit={handleSubmit}>
                    <div>
                        <label>First Name:</label>
                        <span>{selectedEmployee.firstName}</span>
                    </div>
                    <div>
                        <label>Last Name:</label>
                        <span>{selectedEmployee.lastName}</span>
                    </div>
                    <div>
                        <label>Email:</label>
                        <span>{selectedEmployee.email}</span>
                    </div>
                    <div>
                        <label>Position:</label>
                        <span>{selectedEmployee.position}</span>
                    </div>
                    <div>
                        <label>Department:</label>
                        <span>{selectedEmployee.department}</span>
                    </div>
                    <div>
                        
                        <label>
                            <input
                                type="checkbox"
                                name="completed"
                                checked={selectedEmployee.completed}
                                onChange={handleCheckboxChange}
                            />
                            Set progress to complete
                        </label>
                        
                    </div>
                    <div>
                        <button type="submit" >
                            Update Details
                        </button>
                    </div>
                    </form>
                </div>
            )}
        </div>
    );
}


export default TaskForm;

