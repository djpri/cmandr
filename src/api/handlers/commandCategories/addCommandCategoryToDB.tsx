import { ApiCommandCategories } from "../../endpoints/commandCategories";

export const addCommandCategoryToDB = async (
  _uid: string,
  category: string
) => {
  try {
    const { data } = await ApiCommandCategories.create({ name: category });
    return { data };
  } catch (error) {
    return { error };
  }
};
