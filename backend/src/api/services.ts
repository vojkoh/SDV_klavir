import Day, { ReservationType, Timeslot } from './dayModel';
import { addDays, differenceInCalendarDays, getDay } from 'date-fns';
import { ReserveBodyDto } from './dtos';
import { ResolveRawPathType } from 'mongoose';

const numOfTimeslotsPerDay: number = 14;

const getDateOfNext = (dayOfTheWeek: number): Date => {
  const today = new Date();
  const daysUntilNext = (dayOfTheWeek - getDay(today) + 7) % 7;
  const nextDate = addDays(today, daysUntilNext);
  return nextDate;
};

const createFreshDay = (dayOfTheWeek: number): Day => {
  return new Day({
    date: getDateOfNext(dayOfTheWeek),
    dayOfTheWeek: dayOfTheWeek,
    timeslots: [...Array(numOfTimeslotsPerDay)].map((_, i) => (
      {
        // TO-DO: add start time!
        timeslotNo: i,
        start: `${7 + i}:00`,
        reservationType: ReservationType.Unreserved,
        reservedBy: 'nobody'
      } as Timeslot
    ))
  });
};

export default class Services {

  static async getDay(dayOfTheWeek: number) {
    if (dayOfTheWeek > 7 || dayOfTheWeek < 0) {
      return null;
    }
    // Logic to retrieve a day by its dayOfTheWeek
    const day: Day | null = await Day.findOne({ dayOfTheWeek: dayOfTheWeek });

    if (!day) { 
      //create a new day if it doesn't exist
      const newDay: Day = createFreshDay(dayOfTheWeek);
      await newDay.save();
      return newDay;
    }

    const dayDiff = differenceInCalendarDays(day.date, new Date());
    console.log(`Day difference: ${dayDiff}`);

    if (dayDiff < 0) {
      // If the day is in the past, clean all temporary reservations
      const oldDay = day;
      const cleanedTimeslots = oldDay.timeslots.map((ts) => {
        ts.start = ts.start;
        ts.reservedBy = ts.reservationType === ReservationType.Temporary ? undefined : ts.reservedBy;
        ts.reservationType = ts.reservationType === ReservationType.Temporary ? ReservationType.Unreserved : ts.reservationType;
        return ts;
      });
      const newDate = getDateOfNext(oldDay.dayOfTheWeek);
      console.log("here");
      const newDay = await Day.findOneAndUpdate({ _id: oldDay._id }, { $set: { timeslots: cleanedTimeslots, date: newDate }}, {new: true});
      return newDay;
    }

    return day;
  }

  static async reserveTimeslot(dayOfTheWeek: number, timeslotId: number, body: ReserveBodyDto) {
    if (dayOfTheWeek > 7 || dayOfTheWeek < 0 || timeslotId > numOfTimeslotsPerDay || timeslotId < 0) {
      return null;
    }

    const { reservationType, reservedBy } = body

    const filter = { 'dayOfTheWeek': dayOfTheWeek, 'timeslots.timeslotNo': timeslotId };
    const projection = { 'timeslots.$': 1 };
    const timeslot = await Day.findOne(filter, projection);
    if (!timeslot || timeslot.timeslots[0].reservationType != ReservationType.Unreserved) {
      return null;
    }

    const update = { '$set': {
       'timeslots.$.reservationType': reservationType,
       'timeslots.$.reservedBy': reservedBy 
    }};
    const options = {new: true};
    const updatedDay: Day | null = await Day.findOneAndUpdate(filter, update, options);

    return updatedDay;
  }

  static async unreserveTimeslot(dayOfTheWeek: number, timeslotId: number) {
    if (dayOfTheWeek > 7 || dayOfTheWeek < 0 || timeslotId > numOfTimeslotsPerDay || timeslotId < 0) {
      return null;
    }

    const filter = { 'dayOfTheWeek': dayOfTheWeek, 'timeslots.timeslotNo': timeslotId };
    const update = { '$set': {
       'timeslots.$.reservationType': ReservationType.Unreserved,
       'timeslots.$.reservedBy': 'nobody'
    }};
    const options = {new: true};
    const updatedDay: Day | null = await Day.findOneAndUpdate(filter, update, options);

    return updatedDay;
  }
}
