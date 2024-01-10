export interface Reactions {
  thumbsUp: number;
  wow: number;
  heart: number;
  rocket: number;
  coffee: number;
}

export interface Post {
  id?: number;
  title: string;
  body: string;
  userId?: number;
  date?: string;
  reactions?: Reactions;
}
