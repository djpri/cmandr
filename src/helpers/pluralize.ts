export const pluralizeNumItems = (numItems = 0, itemName?: string) => {
  if (numItems === undefined) return "0 items";
  return `${numItems} ${itemName ?? "item"}${numItems === 1 ? "" : "s"}`;
};
