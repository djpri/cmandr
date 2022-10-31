import { CommandReadDto } from "models/command";
export type CommandSortFunction = (
  a: CommandReadDto,
  b: CommandReadDto
) => 1 | -1;
