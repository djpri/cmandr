import { setCommands } from "redux/commands/commandsSlice";
import { AppThunk } from "redux/store";
import { Commands } from "../../endpoints/commands";

export const getCommandsFromDB = (): AppThunk => async (dispatch) => {
  try {
    const { data } = await Commands.getAll();
    if (data !== null) {
      dispatch(setCommands(data));
    }
  } catch (error) {
    dispatch(setCommands([]));
  }
};
