
import {
  Box, Button,
  Checkbox,
  FormControl, FormControlLabel, Grid,
  InputLabel, MenuItem,
  Select, TextField,
  Typography
}
  from '@mui/material';
import { ChangeEvent, FormEvent, useState } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';


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
  const [selectedEmployeeHTML, setSelectedEmployeeHTML] = useState<HTMLSelectElement>();


  function handleEmployeeSelection(event: SelectChangeEvent<HTMLSelectElement>) {
    const employeeIdString = event.target.value as string;
    const employeeIdElement = event.target.value as HTMLSelectElement;
    const employee = hardcodedEmployees.find((e) => e.id.toString() === employeeIdString);

    setSelectedEmployeeId(employeeIdString);
    setSelectedEmployeeHTML(employeeIdElement);
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


  function handleRevertChanges(): void {
    console.log("Revert changes made to employee");
  }


  return (
    <Box sx={{ margin: 'auto', maxWidth: 600 }}>
      <Typography variant="h4" sx={{ textAlign: 'center', bgcolor: '#ffbf00', color: 'white', p: 2, borderRadius: 5 }}>
        Update Employee
      </Typography>
      <FormControl sx={{ my: 2 }}>
        <InputLabel id="employee-select-label">Select an employee</InputLabel>
        <Select
          labelId="employee-select-label"
          id="employee-select"
          value={selectedEmployeeHTML}
          label="Select an employee"
          onChange={handleEmployeeSelection}
        >
          <MenuItem value="">
            <em>Select an employee</em>
          </MenuItem>
          {hardcodedEmployees.map((employee) => (
            <MenuItem key={employee.id} value={employee.id.toString()}>
              {employee.firstName} {employee.lastName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {selectedEmployee && (
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2} sx={{ my: 2 }}>
            <Grid item xs={12} sm={6}>
              <Typography>First Name: {selectedEmployee.firstName}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>Last Name: {selectedEmployee.lastName}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>Email: {selectedEmployee.email}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>Position: {selectedEmployee.position}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>Department: {selectedEmployee.department}</Typography>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="completed"
                    checked={selectedEmployee.completed}
                    onChange={handleCheckboxChange}
                  />
                }
                label="Set progress to complete"
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Update Details
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button onClick={handleRevertChanges} variant="contained" color="primary">
                Revert Changes
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
}

export default EmployeeForm;