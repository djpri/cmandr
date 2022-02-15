import { CmandrApi } from "../../endpoints";

export const addLinkCategoryToDB = async (_uid: string, category: string) => {
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
