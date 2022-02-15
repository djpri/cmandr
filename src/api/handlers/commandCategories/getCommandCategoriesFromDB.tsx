import { setCommandCategories } from "../../../redux/commands/commandsSlice";
import { AppThunk } from "../../../redux/store";
import { ApiCommandCategories } from "../../endpoints/commandCategories";

export const getCommandCategoriesFromDB = (): AppThunk => async (dispatch) => {
  const { data } = await ApiCommandCategories.getAll();
  if (data !== null) dispatch(setCommandCategories(data));
};
