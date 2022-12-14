export interface ITweet {
  id: number;
  text: string;
  like_count: number;
  retweet_count: number;
  reply_count: number;
  time: number;
  user: IUser;
}

export interface IUser {
  username: string;
  handle: string;
  profile_image_url: string;
}
