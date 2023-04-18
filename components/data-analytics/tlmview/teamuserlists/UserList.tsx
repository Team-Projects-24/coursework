/**
 *
 * @author Olivia Gray
 *
 * @description creates and displays list of employees
 *
 */

import { useEffect, useState } from "react";
import { IEmployee } from "types/analysis/Employee.d";

interface Props {
  users: IEmployee[];
  teamIndex: number;
  onSelectUser: (index: number, selectedUsers: boolean[]) => void;
}

function UserList({ users, teamIndex, onSelectUser }: Props) {
  //console.log(users.length);
  //console.log(users?.length);

  const [selectedUsers, setSelectedUsers] = useState(
    new Array(users?.length).fill(false)
  );

  //console.log(selectedUsers);

  if (users) {
    return (
      <ul className="list-group">
        {users.map((user, index) => (
          <li
            className={
              selectedUsers[index] === true
                ? "list-group-item active"
                : "list-group-item"
            }
            key={user.name}
            onClick={() => {
              // (un/)Highlight selected users
              let newState = [...selectedUsers];
              //console.log(selectedUsers);
              //console.log(newState);
              newState[index] = !newState[index];
              setSelectedUsers(newState);
              console.log(newState);
              // Deselect any selected teams and send selectedUsers to team component
              onSelectUser(teamIndex, newState);
            }}
            style={{ textAlign: "left" }}
          >
            {user.name}
          </li>
        ))}
      </ul>
    );
  } else {
    return <div></div>;
  }
}

export default UserList;
