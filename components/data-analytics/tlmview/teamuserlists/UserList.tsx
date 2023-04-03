/**
 * 
 * @author Olivia Gray 
 * 
 * @description creates and displays list of employees
 * 
 */

import { useState } from "react";

interface Props {
  users: string[];
  teamIndex: number;
  onSelectUser: (index: number, selectedUsers: boolean[]) => void;
}

function UserList({ users, teamIndex, onSelectUser }: Props) {
  const [selectedUsers, setSelectedUsers] = useState([false, false, false]);

  const onSelectTeam = () => {
    // Deselect all users
    setSelectedUsers([false, false, false]);
  };

  return (
    <ul className="list-group">
      {users.map((user, index) => (
        <li
          className={
            selectedUsers[index] === true
              ? "list-group-item active"
              : "list-group-item"
          }
          key={user}
          onClick={() => {
            // (un/)Highlight selected users
            let newState = [...selectedUsers];
            newState[index] = !newState[index];
            setSelectedUsers(newState);

            // Deselect any selected teams and send selectedUsers to team component
            onSelectUser(teamIndex, newState);
          }}
          style={{ textAlign: "left" }}
        >
          {user}
        </li>
      ))}
    </ul>
  );
}

export default UserList;
