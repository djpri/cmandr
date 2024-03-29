import { CategoryReadDto } from "./category";

export interface SnippetCreateDto {
  title?: string | undefined;
  description?: string | undefined;
  code?: string | undefined;
  language?: string | undefined;
  starred?: boolean;
  categoryId?: number;
}

export interface SnippetReadDto {
  id: number;
  title: string;
  description: string;
  code: string;
  language: string;
  starred: boolean;
  category: CategoryReadDto;
}

export interface SnippetUpdateDto {
  title: string | undefined;
  description: string | undefined;
  code: string | undefined;
  language: string | undefined;
  starred: boolean;
  categoryId: number;
}
