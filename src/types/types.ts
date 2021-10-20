export type Command = {
  id: string;
  howTo: string;
  command: string;
  reference: string;
  category: string;
};

export type UserAuthState = {
  userData: { uid: string } | null;
  displayName: string | null;
  initialized: boolean;
  isLoading: boolean;
  isLoggedIn: boolean;
  errorMessage: string | null;
};

export type CommandsState = {
  commands: Command[];
  categories: string[];
};
