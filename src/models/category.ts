export interface CategoryReadDto {
  id: number;
  name: string;
  parentId?: number;
  items?: number;
  isGroup?: boolean;
  displayIndex?: number;
}

export const mapToCategoryUpdateDto = (readDto: CategoryReadDto) => {
  return {
    name: readDto.name,
    parentId: readDto?.parentId,
    displayIndex: readDto?.displayIndex,
    isGroup: readDto?.isGroup,
  };
};

export interface CategoryCreateDto {
  name: string;
  parentId?: number;
  items?: number;
  isGroup?: boolean;
}

export interface CategoryUpdateDto {
  name: string;
  parentId: number;
  isGroup: boolean;
  displayIndex: number;
}

export interface CategoryDisplayIndexDto {
  id: number;
  displayIndex: number;
}
