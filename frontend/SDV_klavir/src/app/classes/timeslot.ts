import { ReservationType } from './reservation-type';

export interface Timeslot {
    timeslotNo: number;
    start: string;
    reservationType: ReservationType;
    reservedBy: string | undefined;
}
