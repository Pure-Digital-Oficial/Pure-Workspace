export interface ValidateTokenExpirationRepository {
  validate(token: string): Promise<boolean>;
}
