import { setDeleteLinkCategory } from "../../redux/links/linksSlice";
import { AppThunk } from "../../redux/store";
import { CmandrApi } from "../apiAxiosInstance";

export const deleteLinkCategoryInDB =
  (id: number): AppThunk =>
  async (dispatch) => {
    try {
      await CmandrApi.delete(`commands/links/${id}`);
      dispatch(setDeleteLinkCategory(id));
    } catch (error) {
      console.log(error);
    }
  };
