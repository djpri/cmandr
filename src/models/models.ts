export interface Command {
  id: number;
  description: string;
  command: string;
  reference: string;
  category: CommandCategory;
}

export interface CommandCategory {
  id: number;
  name: string;
}

export interface CommandsState {
  commands: Command[];
  categories: CommandCategory[];
}

export type Link = {
  id: number;
  title: string;
  link: string;
  favicon_url: string;
  category: LinkCategory;
};

export interface LinkCategory {
  id: number;
  name: string;
}

export interface LinksState {
  links: Link[];
  categories: LinkCategory[];
}

export interface UserAuthState {
  userData: any;
  displayName: string | null;
  initialized: boolean;
  isLoading: boolean;
  isLoggedIn: boolean;
  errorMessage: string | null;
}
