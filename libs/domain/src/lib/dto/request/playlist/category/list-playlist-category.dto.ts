export interface ListPlaylistCategoryDto {
  userInput: string;
  companyId: string;
  loggedUserId: string;
  take?: number;
  skip?: number;
}
