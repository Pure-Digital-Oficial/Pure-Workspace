export interface ListCategoryDto {
  filter: string;
  loggedUserId: string;
  take?: number;
  skip?: number;
}
