import { setCommands } from "../../redux/commands/commandsSlice";
import { AppThunk } from "../../redux/store";
import { CmandrApi } from "../apiAxiosInstance";

export const getCommandsFromDB = (): AppThunk => async (dispatch) => {
  const addData = async () => {
    try {
      const { data } = await CmandrApi.get("commands");
      if (data !== null) {
        dispatch(setCommands(data));
      }
    } catch (error) {
      dispatch(setCommands([]));
    }
  };

  addData();
};
