export interface Command {
  id: number;
  description: string;
  command: string;
  reference: string;
  category: CommandCategory;
}

export type CommandRowInDb = {
  id: string;
  description: string;
  command: string;
  reference: string | null;
  // foreign keys
  user_id: string;
  category_id: string | null;
};

export interface CommandCategory {
  id: number;
  name: string;
}

export interface CommandCategoryRowInDb {
  id: string;
  name: string;
  // foreign key
  user_id: string;
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
