import { LinkCategory } from "./category";

export interface Link {
  id: number;
  link: string;
  title: string;
  category: LinkCategory;
  previewImageUrl?: string;
  favicon_url?: string;
  dateCreated?: Date;
}

export interface LinkCreateDto {
  link: string;
  title: string;
  categoryId: number;
}

export interface LinkUpdateDto extends LinkCreateDto {}
