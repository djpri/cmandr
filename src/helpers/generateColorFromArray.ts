import { CategoryReadDto } from "models/category";

export const generateColorFromArray = (
  item: CategoryReadDto,
  array: unknown[],
  hue = 210
) => {
  return `hsl(${hue}, ${(item.items / array.length) * 100 + 40}%, 35%)`;
};
