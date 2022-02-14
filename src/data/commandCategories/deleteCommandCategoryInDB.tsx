import { deleteCommandCategory } from "../../redux/commands/commandsSlice";
import { AppThunk } from "../../redux/store";
import { CmandrApi } from "../apiAxiosInstance";

export const deleteCommandCategoryInDB =
  (id: number): AppThunk =>
  async (dispatch) => {
    try {
      await CmandrApi.delete(`commands/categories/${id}`);
      dispatch(deleteCommandCategory(id));
    } catch (error) {
      console.log(error);
    }
  };
