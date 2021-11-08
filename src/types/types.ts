export type Command = {
  id: string;
  description: string;
  command: string;
  reference: string;
  category: string;
};

export type CommandCategory = {
  id: string;
  name: string;
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
  categories: CommandCategory[];
}
