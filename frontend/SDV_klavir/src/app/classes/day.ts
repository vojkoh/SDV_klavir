import { Timeslot } from "./timeslot";

export interface Day {
    _id: string;
    date: Date;	
    dayOfTheWeek: number;
    timeslots: Timeslot[];
}

interface DayPlaceholder {
    name: string;
    dayOfTheWeek: number;
}

export const days2Names : DayPlaceholder[] = [
    { name: "Ponedeljek", dayOfTheWeek: 1 },
    { name: "Torek", dayOfTheWeek: 2 },
    { name: "Sreda", dayOfTheWeek: 3 },
    { name: "Četrtek", dayOfTheWeek: 4 },
    { name: "Petek", dayOfTheWeek: 5 },
    { name: "Sobota", dayOfTheWeek: 6 },
    { name: "Nedelja", dayOfTheWeek: 0 }
];
