export interface IFavoriteVideo {
  id: string;
  title: string;
}

export class FavoriteVideo implements IFavoriteVideo {
  id: string;
  title: string;
  constructor(_id: string, _title: string) {
    this.id = _id;
    this.title = _title;
  }
}
