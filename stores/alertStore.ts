import { IAlert } from "types/Alert.d";
import { create } from "zustand";

/**
 * @author Tom Whitticase
 *
 * @description A store for managing alerts throughout the application.
 * Any page can add an alert to the store which will then be removed and displayed by the app wrapper.
 */

interface IAlertStore {
  alerts: IAlert[];
  addAlert: (
    message: string,
    type: "success" | "error" | "info" | "warning"
  ) => void;
  removeAlert: (id: number) => void;
}

const useAlertStore = create<IAlertStore>((set) => ({
  alerts: [],
  addAlert: (message: string, type: "success" | "error" | "info" | "warning") =>
    set((state: IAlertStore) => ({
      alerts: [
        ...state.alerts,
        {
          id: Math.random(),
          message,
          type,
        } as IAlert,
      ],
    })),
  removeAlert: (id: number) =>
    set((state: IAlertStore) => ({
      alerts: state.alerts.filter((alert) => alert.id !== id),
    })),
}));

export default useAlertStore;
