export interface ConvertStringInTimeRepository {
  convert(input: string): Promise<Date>;
}
