import { setCommands } from "../../redux/commands/commandsSlice";
import { AppThunk } from "../../redux/store";
import { supabase } from "../../supabase/supabase";

export const getCommandsFromDB = (): AppThunk => async (dispatch) => {
  const addData = async () => {
    const { data: commands } = await supabase
      .from("commands")
      .select(
        `
        id,
        description,
        command,
        reference,
        category:command_categories(
          id,
          name
        )
      `
      )
      .limit(100);

    if (commands !== null) {
      dispatch(setCommands(commands));
    } else {
      dispatch(setCommands([]));
    }
  };

  addData();
};
