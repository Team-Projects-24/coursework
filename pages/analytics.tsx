
// need to change the name of this file to admin.tsx and make the appropriate button to link to this page

import { TaskForm } from "components/data-analytics/tlmview/AdminWindow";
import { EmployeeForm } from "components/data-analytics/tlmview/AdminWindow";
import DataAnalyticsWindow from "components/data-analytics/tlmview/DataAnalyticsWindow";

function Admin() {
    return (
        <div>
            <h1 >Admin Page</h1>

            <div style={{display:'flex'}}>

                <div style={{flex:1}}>
                <TaskForm />
                </div>

                <div style={{flex:1}}>

                <EmployeeForm />
                </div>
                </div>

            

            <div>
                <DataAnalyticsWindow/>
            </div>
            {/* Add other components here */}
        </div>
    );
}

export default Admin;