
import TaskForm from "components/data-analytics/TaskForm";
import EmployeeForm from "components/data-analytics/EmployeeForm";
import PerformanceForm from "components/data-analytics/PerformanceForm";
import SearchableDropdown from "components/data-analytics/PerformanceForm";
import NewTaskForm from "components/data-analytics/NewTaskForm";

function Admin() {
    return (
        <div>
            <h1 >Admin Page for showing off the functionality of our api</h1>

            <div>
                <SearchableDropdown />
            </div>

            <div>
                <NewTaskForm/>
            </div>

            <div>
                <TaskForm />
            </div>
            <div>
                <EmployeeForm />
            </div>
            


        </div>
    );
}

export default
    Admin;