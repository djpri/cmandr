import { setCommandCategories } from "../../../redux/commands/commandsSlice";
import { AppThunk } from "../../../redux/store";
import { CommandCategories } from "../../endpoints/commandCategories";

export const getCommandCategoriesFromDB = (): AppThunk => async (dispatch) => {
  const { data } = await CommandCategories.getAll();
  if (data !== null) dispatch(setCommandCategories(data));
};
