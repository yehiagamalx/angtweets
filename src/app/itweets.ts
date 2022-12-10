export interface ITweet {
  id: number;
  text: string;
  time: number;
  user: IUser
}

export interface IUser {
  username: string;
  handle: string;
  profile_image_url: string;
}
