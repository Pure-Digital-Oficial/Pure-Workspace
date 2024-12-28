export interface ListPlaylistDto {
  userInput: string;
  loggedUserId: string;
  companyId: string;
  take?: number;
  skip?: number;
}
