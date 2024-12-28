import {
  EntityNotConverted,
  StartTimeCannotBeGreaterEndTime,
  ValidationStartEndTime,
} from '../../../src';
import { SchedulingMock } from '../../entity';

const makeSut = (startTime: Date, endTime: Date) => {
  const sut = ValidationStartEndTime(startTime, endTime);

  return {
    sut,
  };
};

describe('ValidationStartEndTime', () => {
  it('should return undefined when a pass correct start and end time', async () => {
    const { sut } = makeSut(
      new Date('2024-07-23T09:00:00'),
      new Date('2024-07-23T10:00:00')
    );

    const result = await sut;

    expect(result.isLeft()).toBe(false);
    expect(result.isRight()).toBe(true);
    expect(result.value).toStrictEqual(undefined);
  });

  it('should return EntityNotConverted when no pass incorrect start and end time', async () => {
    const { sut } = makeSut(new Date(''), new Date(''));

    const result = await sut;

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotConverted);
  });

  it('should return StartTimeCannotBeGreaterEndTime when no pass start time greater end time', async () => {
    const { sut } = makeSut(
      new Date('2024-07-23T10:00:00'),
      new Date('2024-07-23T09:00:00')
    );

    const result = await sut;

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(StartTimeCannotBeGreaterEndTime);
  });
});
