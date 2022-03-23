import { CategoryReadDto } from "./category";

export interface Link {
  id: number;
  url: string;
  title: string;
  category: CategoryReadDto;
  previewImageUrl?: string;
  favicon_url?: string;
  dateCreated?: Date;
}

/** Object type that is received from response body of api */
export interface LinkReadDto {
  id: number;
  url: string;
  title: string;
  category: CategoryReadDto;
  faviconImageUrl?: string;
}

/** Object that is sent as request body to api when adding a new link */
export interface LinkCreateDto {
  url: string;
  title: string;
  categoryId: number;
}

/** Object that is sent as request body to api when editing an existing link */
export interface LinkUpdateDto extends LinkCreateDto {}
