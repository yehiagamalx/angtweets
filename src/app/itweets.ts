export interface ITweet {
  id: number;
  text: string;
  like_count: number;
  retweet_count: number;
  reply_count: number;
  time: number;
  user: IUser;
  replies: IReply[]
}

export interface IUser {
  username: string;
  name: string;
  profile_image_url: string;
}

export interface IReply {
  id: number;
  text: string;
  like_count: number;
  retweet_count: number;
  reply_count: number;
  time: number;
  user: IUser;
}
