/**
 * @author Olivia Gray
 *
 * @description This is the time frame performance interface. It is used to define the performance object for a given time frame.
 */

export interface ITimeFramePerformance {
  id: string;
  date: Date;
  manHoursSet: Number;
  manHoursCompleted: Number;
}
