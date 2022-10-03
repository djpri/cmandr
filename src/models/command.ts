import { CategoryReadDto } from "models/category";

/** Object type that is received from response body of api */
export interface CommandReadDto {
  id: number;
  description: string;
  line: string;
  reference: string;
  category: CategoryReadDto;
  starred?: boolean;
}

/** Object that is sent as request body to api when adding a new command */
export interface CommandCreateDto {
  description: string;
  line: string;
  reference: string;
  categoryId: number;
}

/** Object that is sent as request body to api when editing an existing command */
export interface CommandUpdateDto extends CommandCreateDto {}
