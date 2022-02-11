import { setCommandCategories } from "../../redux/commands/commandsSlice";
import { AppThunk } from "../../redux/store";
import { supabase } from "../../supabase/supabase";

export const getCommandCategoriesFromDB = (): AppThunk => async (dispatch) => {
  const { data: categories } = await supabase
    .from("command_categories")
    .select(`id, name`)
    .order("name");

  if (categories !== null) dispatch(setCommandCategories(categories));
};
