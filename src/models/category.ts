export interface CommandCategory {
  id: number;
  userId?: number;
  name: string;
  parentId?: number;
  items?: number;
}
export interface LinkCategory {
  id: number;
  userId?: number;
  name: string;
  parentId?: number;
}
