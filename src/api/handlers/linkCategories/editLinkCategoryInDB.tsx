import { setEditLinkCategory } from "redux/links/linksSlice";
import { AppThunk } from "redux/store";
import { LinkCategories } from "../../endpoints/linkCategories";

export const editLinkCategoryInDB =
  (id: number, name: string): AppThunk =>
  async (dispatch) => {
    try {
      const requestBody = { id, name };
      await LinkCategories.update(id, requestBody);
      dispatch(setEditLinkCategory({ id, name }));
    } catch (error) {
      return error;
    }
  };
