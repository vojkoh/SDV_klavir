import { ReservationType } from "./dayModel";

export class CreateTimeslotDto {
  date!: Date;
}

export class ReserveBodyDto {
  reservationType!: ReservationType;
  reservedBy!: String;
}