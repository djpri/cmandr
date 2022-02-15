import { setCommands } from "../../../redux/commands/commandsSlice";
import { AppThunk } from "../../../redux/store";
import { CmandrApi } from "../../endpoints";

export const getCommandsByCategoryFromDB =
  (categoryId: number): AppThunk =>
  async (dispatch) => {
    const addData = async (categoryId: number) => {
      const { data } = await CmandrApi.get(`commands/list/${categoryId}`);
      if (data !== null) {
        dispatch(setCommands(data));
      } else {
        dispatch(setCommands([]));
      }
    };

    addData(categoryId);
  };
