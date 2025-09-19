import { ReservationType } from './reservation-type';

export interface Timeslot {
    _id: string;
    timeslotNo: number;
    start: string;
    reservationType: ReservationType;
    reservedBy: string | undefined;
}
