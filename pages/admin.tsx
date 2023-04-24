
import TaskForm from "components/data-analytics/TaskForm";
import EmployeeForm from "components/data-analytics/EmployeeForm";

function Admin() {
    return (
        <div>
            <h1 >Admin Page for showing off the functionality of our api</h1>

            <div style={{display:'flex'}}>

                <div style={{flex:1}}>
                <TaskForm />
                </div>

                <div style={{flex:1}}>

                <EmployeeForm />
                </div>
                </div>

            
        </div>
    );
}

export default 
Admin;