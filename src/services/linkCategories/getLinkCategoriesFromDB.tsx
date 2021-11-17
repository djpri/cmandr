import { setLinkCategories } from "../../redux/links/linksSlice";
import { AppThunk } from "../../redux/store";
import { supabase } from "../../supabase/supabase";

export const getLinkCategoriesFromDB = (): AppThunk => async (dispatch) => {
  const { data: categories } = await supabase
    .from("link_categories")
    .select(`id, name`);

  if (categories !== null) dispatch(setLinkCategories(categories));
};
