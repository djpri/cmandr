import { CommandCategories } from "../../endpoints/commandCategories";

export const addCommandCategoryToDB = async (
  _uid: string,
  category: string
) => {
  const requestBody = { name: category };
  try {
    const { data } = await CommandCategories.create(requestBody);
    return { data };
  } catch (error) {
    return { error };
  }
};
