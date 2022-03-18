import { CommandCategory } from "./category";

export interface Command {
  id: number;
  description: string;
  line: string;
  reference: string;
  category: CommandCategory;
}

/** Object type that is received from response body of api */
export interface CommandReadDto {
  id: number;
  description: string;
  line: string;
  reference: string;
  category: CommandCategory;
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
