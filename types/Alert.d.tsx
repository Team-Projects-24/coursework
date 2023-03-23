/**
 * @author Tom Whitticase
 *
 * @description This is the alert interface. It is used to define the alert object.
 */

export interface IAlert {
  id: number;
  type: "success" | "error" | "info" | "warning";
  message: string;
}
