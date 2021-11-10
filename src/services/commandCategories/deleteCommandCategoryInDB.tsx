import { setDeleteCommandCategory } from "../../redux/commands/commandsSlice";
import { AppThunk } from "../../redux/store";
import { supabase } from "../../supabase/supabase";

export const deleteCommandCategoryInDB =
  (id: string): AppThunk =>
  async (dispatch) => {
    const { error } = await supabase
      .from("command_categories")
      .delete()
      .match({ id: id });
    if (error === null) {
      dispatch(setDeleteCommandCategory(id));
    } else {
      console.log(error);
    }
    return { error };
  };
