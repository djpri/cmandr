import { setCommands } from "../../redux/commands/commandsSlice";
import { AppThunk } from "../../redux/store";
import { CmandrApi } from "../api";

export const getCommandsFromDB = (): AppThunk => async (dispatch) => {
  const addData = async () => {
    try {
      console.log("I tried");
      const { data } = await CmandrApi.get("commands");
      console.log(data);
      if (data !== null) {
        dispatch(setCommands(data));
      }
    } catch (error) {
      dispatch(setCommands([]));
    }
  };

  addData();
};
