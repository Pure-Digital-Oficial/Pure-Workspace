import {
  EntityNotConverted,
  StartTimeCannotBeGreaterEndTime,
} from '../../error';
import { Either, left, right } from '../../shared/either';

function isValidDate(date: unknown) {
  return date instanceof Date && !isNaN(date.getTime());
}

export async function ValidationStartEndTime(
  startTime: Date,
  endTime: Date
): Promise<Either<EntityNotConverted | StartTimeCannotBeGreaterEndTime, void>> {
  if (!isValidDate(startTime) || !isValidDate(endTime)) {
    return left(new EntityNotConverted('Start Time or End Time'));
  }

  if (startTime > endTime) {
    return left(new StartTimeCannotBeGreaterEndTime('Start Time'));
  }

  return right(undefined);
}
