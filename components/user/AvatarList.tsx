import axios from "axios";
import { useEffect, useState } from "react";
import { IUser } from "types/User.d";
import UserAvatar from "./UserAvatar";

/**
 * @author Tom Whitticase
 *
 * @description Provides a list of avatars for a list of users.
 * If given a list of user ids, it will fetch the users from the database, otherwise it will use the users provided.
 *
 * @param users - Array of users
 * @param userIds - Array of user ids
 * @param size - Size of the avatars
 *
 * @returns JSX.Element
 */

interface IProps {
  userIds: string[];
}
export default function AvatarList({ userIds }: IProps) {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loadedUsers, setLoadedUsers] = useState(false);

  useEffect(() => {
    async function fetchUsers() {
      const userPromises = userIds.map((userId) => {
        return axios.post("/api/users/getUserInfo", {
          username: userId,
        });
      });

      const responses = await Promise.all(userPromises);
      setUsers(responses.map((response) => response.data.user));
      setLoadedUsers(true);
    }
    fetchUsers();
  }, [userIds]);

  return (
    <div className="flex">
      {loadedUsers &&
        users &&
        users.map((user, i) => (
          <div key={i} className="-mx-1">
            <UserAvatar size={undefined} border={true} user={user} />
          </div>
        ))}
    </div>
  );
}
