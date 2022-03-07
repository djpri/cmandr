import { CommandCategories } from "../../endpoints/commandCategories";

export const addCommandCategoryToDB = async (category: string) => {
  const requestBody = { name: category };
  try {
    const { data } = await CommandCategories.create(requestBody);
    return { data };
  } catch (error) {
    return { error };
  }
};
