export interface Command {
  id: number;
  description: string;
  command: string;
  reference: string;
  category: CommandCategory;
}

export interface Link {
  id: number;
  link: string;
  category: LinkCategory;
}

export interface LinkCategory {
  id: number;
  name: string;
}
export interface CommandCategory {
  id: number;
  name: string;
}

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
