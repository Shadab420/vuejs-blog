import Post from "../Post";

export interface State {
  isLoading: boolean;
  auth: {
    userEmail: string;
    token: string;
  };
  posts: Post[];
  searchKey: string;
  post: Post;
  errors: {
    auth: string | null;
    post: string | null;
  };
}
