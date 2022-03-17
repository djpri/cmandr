import { CommandReadDto } from "models/command";

/**
 * Sort functions to be used with useCommandsFilter hook
 */
export const sortFunctions = {
  description: {
    ascend: (a: CommandReadDto, b: CommandReadDto) => {
      if (a.description.toUpperCase() > b.description.toUpperCase()) {
        return 1;
      } else {
        return -1;
      }
    },
    descend: (a: CommandReadDto, b: CommandReadDto) => {
      if (a.description.toUpperCase() < b.description.toUpperCase()) {
        return 1;
      } else {
        return -1;
      }
    },
  },
  line: {
    ascend: (a: CommandReadDto, b: CommandReadDto) => {
      if (a.line.toUpperCase() > b.line.toUpperCase()) {
        return 1;
      } else {
        return -1;
      }
    },
    descend: (a: CommandReadDto, b: CommandReadDto) => {
      if (a.line.toUpperCase() < b.line.toUpperCase()) {
        return 1;
      } else {
        return -1;
      }
    },
  },
  category: {
    ascend: (a: CommandReadDto, b: CommandReadDto) => {
      if (a.category.name.toUpperCase() > b.category.name.toUpperCase()) {
        return 1;
      } else {
        return -1;
      }
    },
    descend: (a: CommandReadDto, b: CommandReadDto) => {
      if (a.category.name.toUpperCase() < b.category.name.toUpperCase()) {
        return 1;
      } else {
        return -1;
      }
    },
  },
};

export type CommandSortFunction = (
  a: CommandReadDto,
  b: CommandReadDto
) => 1 | -1;
