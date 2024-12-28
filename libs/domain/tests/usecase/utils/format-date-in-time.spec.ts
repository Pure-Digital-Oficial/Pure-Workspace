import { FormatDateInTime } from '../../../src';

const makeSut = (time: Date) => {
  const sut = FormatDateInTime(time);

  return {
    sut,
  };
};

describe('FormatDateInTime', () => {
  it('shoud return time below 10 when pass correct date', () => {
    const { sut } = makeSut(new Date('2024-07-23T09:00:00'));

    const result = sut;

    expect(result).toStrictEqual('09:00');
  });

  it('shoud return time over 10 when pass correct date', () => {
    const { sut } = makeSut(new Date('2024-07-23T10:30:00'));

    const result = sut;

    expect(result).toStrictEqual('10:30');
  });
});
