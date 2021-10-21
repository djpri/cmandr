import { User } from "@firebase/auth";

export type Command = {
  id: string;
  howTo: string;
  command: string;
  reference: string;
  category: string;
};

export interface UserAuthState {
  userData: any;
  displayName: string | null;
  initialized: boolean;
  isLoading: boolean;
  isLoggedIn: boolean;
  errorMessage: string | null;
}

export interface CommandsState {
  commands: Command[];
  categories: string[];
}
