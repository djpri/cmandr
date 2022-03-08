import { setCommands } from "redux/commands/commandsSlice";
import { AppThunk } from "redux/store";
import { Commands } from "../../endpoints/commands";

export const getCommandsByCategoryFromDB =
  (categoryId: number): AppThunk =>
  async (dispatch) => {
    try {
      const { data } = await Commands.getAllByCategoryId(categoryId);
      dispatch(setCommands(data));
    } catch (error) {
      dispatch(setCommands([]));
    }
  };
