import { DayOfTheWeek } from "./day-of-the-week";
import { Timeslot } from "./timeslot";

export interface Day {
    id: string;
    date: Date;	
    dayOfTheWeek: DayOfTheWeek;
    timeslots: Timeslot[];
    createdAt: Date;
    updatedAt: Date;
}
