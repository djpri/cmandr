import { deleteCommandCategory } from "redux/commands/commandsSlice";
import { AppThunk } from "redux/store";
import { CommandCategories } from "../../endpoints/commandCategories";

export const deleteCommandCategoryInDB =
  (id: number): AppThunk =>
  async (dispatch) => {
    try {
      await CommandCategories.remove(id);
      dispatch(deleteCommandCategory(id));
    } catch (error) {
      console.log(error);
    }
  };
