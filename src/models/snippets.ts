export interface SnippetCreateDto {
  title?: string | undefined;
  description?: string | undefined;
  code?: string | undefined;
  language?: string | undefined;
  starred?: boolean;
}

export interface SnippetReadDto {
  id: number;
  title: string;
  description: string;
  code: string;
  language: string;
  starred: boolean;
  dateCreated?: Date;
  dateUpdated?: Date;
}

export interface SnippetUpdateDto {
  title?: string | undefined;
  description?: string | undefined;
  code?: string | undefined;
  language?: string | undefined;
  starred?: boolean;
}