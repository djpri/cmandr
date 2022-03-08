import { Links } from "api/endpoints/links";
import { setLinks } from "redux/links/linksSlice";
import { AppThunk } from "redux/store";

export const getLinksFromDB = (): AppThunk => async (dispatch) => {
  try {
    const { data } = await Links.getAll();
    dispatch(setLinks(data));
  } catch (error) {
    dispatch(setLinks([]));
  }
};
