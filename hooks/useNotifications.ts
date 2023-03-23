// import axios from "axios";
// import { useEffect, useState } from "react";
// import useUserStore from "stores/userStore";
// import { INotification } from "types/Notification.d";

// /**
//  * @author Tom Whitticase
//  *
//  * @description This hook is used to get notifications from the database.
//  *
//  * @output {INotification[]} notifications - All notifications
//  * @output {boolean} loading - Whether the notifications are still loading
//  */

// ///////UNDER CONSTRUCTION///////

// export const useNotifications = () => {
//   const { user } = useUserStore();
//   const [loading, setLoading] = useState(true);
//   const [notifications, setNotifications] = useState<null | INotification[]>();
//   const [loadingDeleteNotification, setLoadingDeleteNotification] =
//     useState(false);

//   async function fetchData() {
//     setLoading(true);
//     if (!user) return;
//     const username = user.userId;
//     const data = { username };

//     try {
//       const response = await axios.post(
//         "/api/notifications/getNotifications",
//         data
//       );
//       setNotifications(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//     setLoading(false);
//   }
//   useEffect(() => {
//     fetchData();
//   }, []);

//   const deleteNotification = async (id: number) => {
//     setLoadingDeleteNotification(true);
//     try {
//       const data = { id };
//       const response = await axios.post(
//         "/api/notifications/deleteNotification",
//         data
//       );
//       fetchData();
//     } catch (error) {
//       console.error(error);
//     }
//     setLoadingDeleteNotification(false);
//   };

//   return { loading, notifications, deleteNotification };
// };
