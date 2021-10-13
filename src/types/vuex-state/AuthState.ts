export interface AuthState {
  isLoading: boolean;
  auth: {
    userEmail: string;
    token: string;
  };
  error: {
    message: string | null;
  };
}
