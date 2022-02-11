import { setCommandCategories } from "../../redux/commands/commandsSlice";
import { AppThunk } from "../../redux/store";
import { CmandrApi } from "../api";

export const getCommandCategoriesFromDB = (): AppThunk => async (dispatch) => {
  const { data } = await CmandrApi.get("commands/categories");

  if (data !== null) dispatch(setCommandCategories(data));
};
