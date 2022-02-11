import { setEditLinkCategory } from "../../redux/links/linksSlice";
import { AppThunk } from "../../redux/store";
import { supabase } from "../../supabase/supabase";

export const editLinkCategoryInDB =
  (id: number, name: string): AppThunk =>
  async (dispatch) => {
    const { error } = await supabase
      .from("link_categories")
      .update({ name })
      .match({ id: id });

    dispatch(setEditLinkCategory({ id, name }));

    return { error };
  };
