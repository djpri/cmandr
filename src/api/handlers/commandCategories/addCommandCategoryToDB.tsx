import { CmandrApi } from "../../endpoints";

export const addCommandCategoryToDB = async (
  _uid: string,
  category: string
) => {
  try {
    // const { data } = await CommandCategories;
    const { data } = await CmandrApi({
      method: "post",
      url: "/commands/categories",
      data: {
        name: category,
      },
    });
    return { data };
  } catch (error) {
    return { error };
  }
};