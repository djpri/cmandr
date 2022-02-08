import { supabase } from "../../supabase/supabase";
import { CmandrApi } from "../api";

const getData = CmandrApi({
  method: "post",
  url: "/commands/categories",
  data: {
    name: "Test",
  },
});

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
