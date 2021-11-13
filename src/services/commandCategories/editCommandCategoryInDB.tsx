import { setEditCommandCategory } from "../../redux/commands/commandsSlice";
import { AppThunk } from "../../redux/store";
import { supabase } from "../../supabase/supabase";

export const editCommandCategoryInDB =
  (id: number, name: string): AppThunk =>
  async (dispatch) => {
    const { error } = await supabase
      .from("command_categories")
      .update({ name })
      .match({ id: id });

    dispatch(setEditCommandCategory({ id, name }));

    return { error };
  };
