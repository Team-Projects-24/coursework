/**
 * @author Tom Whitticase
 *
 * @description A custom hook for getting a user from the database when given a userId (email address)
 *
 * @output {IUser} user - The user
 * @output {boolean} loading - Whether the user is still loading
 * @output {function} editUser - Function to edit a user
 * @output {function} deleteUser - Function to delete a user
 * @output {function} createUser - Function to create a user
 * @output {boolean} loadingEditUser - Whether the edit user is still loading
 * @output {boolean} loadingDeleteUser - Whether the delete user is still loading
 * @output {boolean} loadingCreateUser - Whether the create user is still loading
 */

//////UNDER CONSTRUCTION///////
////untested

import axios from "axios";
import { useState } from "react";
import { IUser } from "types/User.d";

export const useUsers = (userId: string) => {
  const [user, setUser] = useState<null | IUser>();
  const [users, setUsers] = useState<null | IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingEditUser, setLoadingEditUser] = useState(false);
  const [loadingDeleteUser, setLoadingDeleteUser] = useState(false);
  const [loadingCreateUser, setLoadingCreateUser] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    if (!userId) {
      try {
        const data = { userId };
        const response = await axios.post(`/api/users/getUsers`, data);
        const { users } = response.data;
        setUsers(users);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const data = { userId };
        const response = await axios.post(`/api/users/getUser`, data);
        const { user } = response.data;
        setUser(user);
      } catch (error) {
        console.error(error);
      }
    }
    setLoading(false);
  };

  return { users };
};
