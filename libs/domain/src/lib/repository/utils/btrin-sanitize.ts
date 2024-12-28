export interface BtrinSanitizeRepository {
  btrin(input: string): Promise<string | undefined>;
}
