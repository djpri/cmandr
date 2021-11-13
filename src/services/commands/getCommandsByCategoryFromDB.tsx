import { setCommands } from "../../redux/commands/commandsSlice";
import { AppThunk } from "../../redux/store";
import { supabase } from "../../supabase/supabase";

export const getCommandsByCategoryFromDB =
  (categoryId: number): AppThunk =>
  async (dispatch) => {
    const addData = async (categoryId: number) => {
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
        .eq("category_id", categoryId);

      if (commands !== null) {
        dispatch(setCommands(commands));
      } else {
        dispatch(setCommands([]));
      }
    };

    addData(categoryId);
  };
