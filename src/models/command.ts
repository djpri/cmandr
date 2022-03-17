import { CommandCategory } from "./category";

export interface Command {
  id: number;
  description: string;
  line: string;
  reference: string;
  category: CommandCategory;
}

export interface CommandReadDto {
  id: number;
  description: string;
  line: string;
  reference: string;
  category: CommandCategory;
}

export interface CommandCreateDto {
  description: string;
  line: string;
  reference: string;
  categoryId: number;
}

export interface CommandUpdateDto extends CommandCreateDto {}
