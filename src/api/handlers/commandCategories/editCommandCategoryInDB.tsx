import { setEditCommandCategory } from "../../../redux/commands/commandsSlice";
import { AppThunk } from "../../../redux/store";
import { CmandrApi } from "../../endpoints";

export const editCommandCategoryInDB =
  (id: number, name: string): AppThunk =>
  async (dispatch) => {
    try {
      await CmandrApi.put(`/commands/categories/${id}`, {
        id,
        name,
      });
      dispatch(setEditCommandCategory({ id, name }));
    } catch (error) {
      return error;
    }
  };
