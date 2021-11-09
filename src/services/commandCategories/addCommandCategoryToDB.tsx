import { supabase } from "../../supabase/supabase";

export const addCommandCategoryToDB = async (uid: string, category: string) => {
  const { data, error } = await supabase.from("command_categories").insert([
    {
      user_id: uid,
      name: category,
    },
  ]);
  if (data) return { data: data[0], error };
  return { data, error };
};
