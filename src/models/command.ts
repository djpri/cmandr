import { CommandCategory } from "./category";

export interface Command {
  id: number;
  description: string;
  line: string;
  reference: string;
  category: CommandCategory;
}

export interface CommandUpdateDto extends Command {}

export interface CommandCreateDto {
  description: string;
  line: string;
  reference: string;
  category: CommandCategory;
}

export class CommandMapper {
  static asUpdateDto(command: Command) {
    const { line, description, reference, category } = command;
    return {
      line,
      description,
      reference,
      category,
    };
  }
  static asCreateDto(command: Command) {
    return this.asUpdateDto(command);
  }
}
