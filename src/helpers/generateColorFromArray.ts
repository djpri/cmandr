import { CategoryReadDto } from "models/category";
export const generateColorFromArray = (
  item: CategoryReadDto,
  array: any[],
  hue: number = 144
) => {
  return `hsl(144, ${(item.items / array.length) * 100 + 40}%, 35%)`;
};
