import { deleteCommandCategory } from "../../redux/commands/commandsSlice";
import { AppThunk } from "../../redux/store";
import { supabase } from "../../supabase/supabase";

export const deleteCommandCategoryInDB =
  (id: number): AppThunk =>
  async (dispatch) => {
    // delete commands with matching category id
    await supabase.from("links").delete().match({ category_id: id });
    // then delete the category
    const { error } = await supabase
      .from("link_categories")
      .delete()
      .match({ id: id });
    // then reflect change in redux store
    if (error === null) {
      dispatch(deleteCommandCategory(id));
    } else {
      console.log(error);
    }
    return { error };
  };
