export interface Command {
  id: number;
  description: string;
  line: string;
  reference: string;
  category: CommandCategory;
}

export interface CommandCategory {
  id: number;
  userId?: string;
  name: string;
}
export interface Link {
  id: number;
  title: string;
  link: string;
  favicon_url?: string | null;
  category: LinkCategory;
}

export interface LinkCategory {
  id: number;
  userId?: string;
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
