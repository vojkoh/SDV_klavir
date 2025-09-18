import { Schema, model, Document} from 'mongoose';
import config from '../config';
// import { prettifyId, useToJsonTransformers } from '../utils/mongo';

export enum ReservationType {
  Temporary = 'temporary',
  Permanent = 'permanent',
  Unreserved = 'unreserved'
}

interface Timeslot extends Document {
  timeslotNo: number;
  start: string;
  reservationType: ReservationType;
  reservedBy: string | undefined;
}

interface Day extends Document {
  date: Date;	
  dayOfTheWeek: number;
  timeslots: Timeslot[];
}


const timeslotSchema = new Schema<Timeslot>(
  {
    timeslotNo: { type: Number, required: true },
    start: { type: String, required: true },
    reservationType: { type: String, enum: Object.values(ReservationType), default: ReservationType.Unreserved, required: true },
    reservedBy: { type: String, sparse: true },
  },
  {
    ...config.database.mongooseSchemaOptions,
  }
);

const daySchema = new Schema<Day>(
  {
    date: { type: Date, required: true },
    dayOfTheWeek: { type: Number, required: true },
    timeslots: { type: [timeslotSchema], default: [] },
  },
  {
    ...config.database.mongooseSchemaOptions,
  }
);

const Day = model<Day>('Day', daySchema);

export { Timeslot };
export default Day;
