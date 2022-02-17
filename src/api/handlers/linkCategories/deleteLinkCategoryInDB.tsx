import { setDeleteLinkCategory } from "../../../redux/links/linksSlice";
import { AppThunk } from "../../../redux/store";
import { LinkCategories } from "../../endpoints/linkCategories";

export const deleteLinkCategoryInDB =
  (id: number): AppThunk =>
  async (dispatch) => {
    try {
      await LinkCategories.remove(id);
      dispatch(setDeleteLinkCategory(id));
    } catch (error) {
      console.log(error);
    }
  };
