import { setCommands } from "../../redux/commands/commandsSlice";
import { AppThunk } from "../../redux/store";
import { CmandrApi } from "../apiAxiosInstance";

export const getCommandsByCategoryFromDB =
  (categoryId: number): AppThunk =>
  async (dispatch) => {
    const addData = async (categoryId: number) => {
      const { data: commands } = await CmandrApi.get(`commands/${categoryId}`);
      if (commands !== null) {
        // dispatch(setCommands(commands));
      } else {
        dispatch(setCommands([]));
      }
    };

    addData(categoryId);
  };
