import { CmandrApi } from "../api";

export const addLinkCategoryToDB = async (uid: string, category: string) => {
  try {
    const { data } = await CmandrApi({
      method: "post",
      url: "/links/categories",
      data: {
        name: category,
      },
    });
    return data;
  } catch (error) {
    return error;
  }
};
