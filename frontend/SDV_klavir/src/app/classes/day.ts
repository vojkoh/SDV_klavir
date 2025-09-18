import { Timeslot } from "./timeslot";

export interface Day {
    id: string;
    date: Date;	
    dayOfTheWeek: number;
    timeslots: Timeslot[];
}

export interface DayPlaceholder {
    name: string;
    dayOfTheWeek: number;
}
