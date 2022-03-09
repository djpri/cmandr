import { Links } from "api/endpoints/links";
import { setLinks } from "redux/links/linksSlice";
import { AppThunk } from "redux/store";

export const getLinksByCategoryFromDB =
  (categoryId: number): AppThunk =>
  async (dispatch) => {
    try {
      const { data } = await Links.getAllByCategoryId(categoryId);
      dispatch(setLinks(data));
    } catch (error) {
      dispatch(setLinks([]));
    }
  };
