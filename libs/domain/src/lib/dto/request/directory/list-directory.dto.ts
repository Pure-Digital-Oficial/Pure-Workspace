export interface ListDirectoryDto {
  userInput: string;
  companyId: string;
  loggedUserId: string;
  take?: number;
  skip?: number;
}
