export interface VerifyUserStatusByIdRepository {
  verify(input: string): Promise<string>;
}
