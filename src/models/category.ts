export interface CommandCategory {
  id: number;
  name: string;
  parentId?: number;
  items?: number;
}

export interface LinkCategory {
  id: number;
  name: string;
  parentId?: number;
  items?: number;
}

/** Object type that is received from response body of api */
export interface CategoryReadDto {
  id: number;
  name: string;
  parentId?: number;
  items?: number;
}

/** Object that is sent as request body to api when adding a new category */
export interface CategoryCreateDto {
  name: string;
  parentId?: number;
  items?: number;
}

/** Object that is sent as request body to api when editing an existing category */
export interface CategoryUpdateDto {
  name: string;
  parentId?: number;
  items?: number;
}
