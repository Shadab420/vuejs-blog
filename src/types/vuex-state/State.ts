import Post from "../Post";

export interface State {
  isLoading: boolean;
  auth: {
    userEmail: string;
    token: string;
  };
  posts: Post[];
  post: Post;
  errors: {
    auth: string | null;
    post: string | null;
  };
}
