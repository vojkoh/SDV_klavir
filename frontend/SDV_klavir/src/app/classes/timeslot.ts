import { ReservationType } from './reservation-type';

export interface Timeslot {
    id: string;
    start: string;
    reservationType: ReservationType;
    reservedBy: string | undefined;
    createdAt: string;
    updatedAt: string;
}
