import Post from "../Post";

export interface PostState {
  isLoading: boolean;
  posts: Post[];
  searchKey: string;
  post: Post;
  error: {
    message: string | null;
  };
}
