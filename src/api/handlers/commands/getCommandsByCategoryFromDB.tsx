import { setCommands } from "redux/commands/commandsSlice";
import { AppThunk } from "redux/store";
import { Commands } from "../../endpoints/commands";

export const getCommandsByCategoryFromDB =
  (categoryId: number): AppThunk =>
  async (dispatch) => {
    const addData = async (categoryId: number) => {
      const { data } = await Commands.getAllByCategoryId(categoryId);
      if (data !== null) {
        dispatch(setCommands(data));
      } else {
        dispatch(setCommands([]));
      }
    };

    addData(categoryId);
  };
