import {
  setCommandCategories,
  setCommands,
} from "../../redux/commands/commandsSlice";
import { AppThunk } from "../../redux/store";
import { supabase } from "../../supabase/supabase";

export const getCommandsAndCategoriesFromDB =
  (): AppThunk => async (dispatch) => {
    const addData = async () => {
      const { data: commands } = await supabase.from("commands").select(`
        id,
        description,
        command,
        reference,
        category:command_categories(
          id,
          name
        )
      `);

      const { data: categories } = await supabase
        .from("command_categories")
        .select(`id, name`);

      if (categories !== null) dispatch(setCommandCategories(categories));

      if (commands !== null) {
        dispatch(setCommands(commands));
      } else {
        dispatch(setCommands([]));
      }
    };

    addData();
  };
