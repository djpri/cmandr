/** Object type that is received from response body of api */
export interface CategoryReadDto {
  id: number;
  name: string;
  parentId?: number;
  items?: number;
  isGroup?: boolean;
  displayIndex?: number;
}

/** Object that is sent as request body to api when adding a new category */
export interface CategoryCreateDto {
  name: string;
  parentId?: number;
  items?: number;
  isGroup?: boolean;
}

/** Object that is sent as request body to api when editing an existing category */
export interface CategoryUpdateDto {
  name: string;
  parentId?: number;
  items?: number;
  displayIndex?: number;
}

export interface CategoryDisplayIndexDto {
  id: number;
  displayIndex: number;
}
