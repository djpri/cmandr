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

export interface LinkUpdateDto extends Link {}

export interface LinkCreateDto {
  link: string;
  title: string;
  category: LinkCategory;
}

export class LinksMapper {
  static asUpdateDto(linkItem: Link) {
    const { link, title, category } = linkItem;
    return {
      link,
      title,
      category,
    };
  }
  static asCreateDto(link: Link) {
    return this.asUpdateDto(link);
  }
}
