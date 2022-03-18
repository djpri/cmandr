import { LinkReadDto } from "models/link";

/**
 * Sort functions to be used with useLinksFilter hook
 */
export const sortFunctions = {
  title: {
    ascend: (a: LinkReadDto, b: LinkReadDto) => {
      if (a.title.toUpperCase() > b.title.toUpperCase()) {
        return 1;
      } else {
        return -1;
      }
    },
    descend: (a: LinkReadDto, b: LinkReadDto) => {
      if (a.title.toUpperCase() < b.title.toUpperCase()) {
        return 1;
      } else {
        return -1;
      }
    },
  },
  url: {
    ascend: (a: LinkReadDto, b: LinkReadDto) => {
      if (a.url.toUpperCase() > b.url.toUpperCase()) {
        return 1;
      } else {
        return -1;
      }
    },
    descend: (a: LinkReadDto, b: LinkReadDto) => {
      if (a.url.toUpperCase() < b.url.toUpperCase()) {
        return 1;
      } else {
        return -1;
      }
    },
  },
  category: {
    ascend: (a: LinkReadDto, b: LinkReadDto) => {
      if (a.category.name.toUpperCase() > b.category.name.toUpperCase()) {
        return 1;
      } else {
        return -1;
      }
    },
    descend: (a: LinkReadDto, b: LinkReadDto) => {
      if (a.category.name.toUpperCase() < b.category.name.toUpperCase()) {
        return 1;
      } else {
        return -1;
      }
    },
  },
};

export type LinksSortFunction = (a: LinkReadDto, b: LinkReadDto) => 1 | -1;
