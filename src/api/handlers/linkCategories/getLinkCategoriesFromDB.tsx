import { setLinkCategories } from "redux/links/linksSlice";
import { AppThunk } from "redux/store";
import { LinkCategories } from "../../endpoints/linkCategories";

export const getLinkCategoriesFromDB = (): AppThunk => async (dispatch) => {
  const { data } = await LinkCategories.getAll();
  if (data !== null) dispatch(setLinkCategories(data));
};
