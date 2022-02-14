import { setEditLinkCategory } from "../../redux/links/linksSlice";
import { AppThunk } from "../../redux/store";
import { CmandrApi } from "../api";

export const editLinkCategoryInDB =
  (id: number, name: string): AppThunk =>
  async (dispatch) => {
    try {
      await CmandrApi.put(`/links/categories/${id}`);
      dispatch(setEditLinkCategory({ id, name }));
    } catch (error) {
      return error;
    }
  };
