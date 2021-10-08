export interface ICommand {
  id: string;
  howTo: string;
  command: string;
  reference: string;
  category: string;
}

export type UserAuthState = {
  userData: {} | null;
  initialized: boolean;
  isLoading: boolean;
  isLoggedIn: boolean;
  errorMessage: string | null;
};
