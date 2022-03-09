import { setEditCommandCategory } from "redux/commands/commandsSlice";
import { AppThunk } from "redux/store";
import { CommandCategories } from "../../endpoints/commandCategories";

export const editCommandCategoryInDB =
  (id: number, name: string): AppThunk =>
  async (dispatch) => {
    const requestBody = { id, name };
    try {
      await CommandCategories.update(id, requestBody);
      dispatch(setEditCommandCategory({ id, name }));
    } catch (error) {
      return error;
    }
  };
