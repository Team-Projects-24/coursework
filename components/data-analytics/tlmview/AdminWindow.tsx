// import React, { useState, useEffect } from 'react';

// function TaskForm() {
//   const [tasks, setTasks] = useState([]);
//   const [selectedTaskId, setSelectedTaskId] = useState(null);
//   const [selectedTask, setSelectedTask] = useState(null);

//   // Fetch tasks from backend when component mounts
//   useEffect(() => {
//     fetch('/tasks')
//       .then((res) => res.json())
//       .then((data) => {
//         setTasks(data);
//       });
//   }, []);

//   // Update selected task when dropdown selection changes
//   const handleTaskSelection = (event) => {
//     const taskId = event.target.value;
//     setSelectedTaskId(taskId);
//     const task = tasks.find((t) => t.task_id === parseInt(taskId));
//     setSelectedTask(task);
//   };

//   // Update task attribute when input field changes
//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setSelectedTask((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   // Update task in database when form is submitted
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     fetch(`/tasks/${selectedTask.task_id}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(selectedTask),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log('Task updated:', data);
//       });
//   };
//   return (
//     <div>
//       <h1>Task Form</h1>
//       <label>
//         Select a task:
//         <select value={selectedTaskId} onChange={handleTaskSelection}>
//           <option value="">Select a task</option>
//           {tasks.map((task) => (
//             <option key={task.task_id} value={task.task_id}>
//               {task.name}
//             </option>
//           ))}
//         </select>
//       </label>
//       {selectedTask && (
//         <form onSubmit={handleSubmit}>
//           <label>
//             Name:
//             <input
//               type="text"
//               name="name"
//               value={selectedTask.name}
//               onChange={handleInputChange}
//             />
//           </label>
//           <br />
//           <label>
//             Description:
//             <input
//               type="text"
//               name="description"
//               value={selectedTask.description}
//               onChange={handleInputChange}
//             />
//           </label>
//           <br />
//           <label>
//             Start date:
//             <input
//               type="date"
//               name="start_date"
//               value={selectedTask.start_date}
//               onChange={handleInputChange}
//             />
//           </label>
//           <br />
//           <label>
//             Due date:
//             <input
//               type="date"
//               name="due_date"
//               value={selectedTask.due_date}
//               onChange={handleInputChange}
//             />
//           </label>
//           <br />
//           <label>
//             Man hours:
//             <input
//               type="number"
//               name="man_hours"
//               value={selectedTask.man_hours}
//               onChange={handleInputChange}
//             />
//           </label>
//           <br />
//           <label>
//             Completed man hours:
//             <input
//               type="number"
//               name="completed_man_hours"
//               value={selectedTask.completed_man_hours}
//               onChange={handleInputChange}
//             />
//           </label>
//           <br />
//           <button type="submit">Update database</button>
//         </form>
//       )}
//     </div>
//   );
// }




import { useState } from 'react';

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

function TaskForm() {
    const [selectedTaskId, setSelectedTaskId] = useState('');
    const [selectedTask, setSelectedTask] = useState<Task | undefined>();

    function handleTaskSelection(event: React.ChangeEvent<HTMLSelectElement>) {
        const taskId = event.target.value;
        const task = hardcodedTasks.find((t) => t.task_id.toString() === taskId);
        setSelectedTaskId(taskId);
        setSelectedTask(task);
    }

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (!selectedTask) {
            return;
        }

        const { name, value } = event.target;
        setSelectedTask((prevTask) => ({
            ...prevTask,
            [name]: value,
        }) as Task);
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!selectedTask) {
            return;
        }

        console.log('Updating task:', selectedTask);
    }

    // const handleAdminClick = () => {
    //     history.push("/admin");
    // };

    return (
        <div>
            <h1>Task Form</h1>
            <label>
                Select a task:
                <select value={selectedTaskId} onChange={handleTaskSelection}>
                    <option value="">Select a task</option>
                    {hardcodedTasks.map((task) => (
                        <option key={task.task_id} value={task.task_id.toString()}>
                            {task.name}
                        </option>
                    ))}
                </select>
            </label>
            {selectedTask && (
                <form onSubmit={handleSubmit}>
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={selectedTask.name}
                            onChange={handleInputChange}
                        />
                    </label>
                    <br />
                    <label>
                        Description:
                        <input
                            type="text"
                            name="description"
                            value={selectedTask.description}
                            onChange={handleInputChange}
                        />
                    </label>
                    <br />
                    <label>
                        Start date:
                        <input
                            type="date"
                            name="start_date"
                            value={selectedTask.start_date}
                            onChange={handleInputChange}
                        />
                    </label>
                    <br />
                    <label>
                        Due date:
                        <input
                            type="date"
                            name="due_date"
                            value={selectedTask.due_date}
                            onChange={handleInputChange}
                        />
                    </label>
                    <br />
                    <label>
                        Man hours:
                        <input
                            type="number"
                            name="man_hours"
                            value={selectedTask.man_hours}
                            onChange={handleInputChange}
                        />
                    </label>
                    <br />
                    <label>
                        Completed man hours:
                        <input
                            type="number"
                            name="completed_man_hours"
                            value={selectedTask.completed_man_hours}
                            onChange={handleInputChange}
                        />
                    </label>
                    <br />
                    <button type="submit">Update task</button>
                </form>
            )}
        </div>
    );



}

export default TaskForm;

