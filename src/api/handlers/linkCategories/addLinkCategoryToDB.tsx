import { LinkCategories } from "../../endpoints/linkCategories";

export const addLinkCategoryToDB = async (category: string) => {
  try {
    const requestBody = {
      name: category,
    };
    const { data } = await LinkCategories.create(requestBody);
    return data;
  } catch (error) {
    return error;
  }
};
