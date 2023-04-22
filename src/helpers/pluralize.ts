export const pluralizeNumItems = (numItems = 0) => {
  if (numItems === undefined) return "0 items";
  return `${numItems} item${numItems === 1 ? "" : "s"}`
};