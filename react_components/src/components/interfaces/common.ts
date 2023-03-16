export interface ICard {
  id: number;
  image: string;
  name: string;
  desc: string;
  openSource: boolean;
  type: string[];
  site: string;
  firstReleaseYear: number;
  firstReleaseMonth: string;
  lastReleaseDate: string;
}
