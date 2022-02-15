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

export interface CategoryCreateDto {
  userId?: number;
  name: string;
  parentId?: number;
  items?: number;
}

export interface CategoryUpdateDto {
  userId?: number;
  name: string;
  parentId?: number;
  items?: number;
}
