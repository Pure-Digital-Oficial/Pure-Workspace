export interface ListContentFileDto {
  userInput: string;
  loggedUserId: string;
  companyId: string;
  directoryId: string;
  take?: number;
  skip?: number;
}
