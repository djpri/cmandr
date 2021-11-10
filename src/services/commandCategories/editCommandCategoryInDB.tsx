import { supabase } from "../../supabase/supabase";

export const editCommandCategoryInDB = async (id: string, name: string) => {
  const { error } = await supabase
    .from("command_categories")
    .update({ name })
    .match({ id: id });

  return { error };
};
