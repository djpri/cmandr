import { setLinks } from "../../redux/links/linksSlice";
import { AppThunk } from "../../redux/store";
import { supabase } from "../../supabase/supabase";

export const getLinksFromDB =
  (categoryId: number): AppThunk =>
  async (dispatch) => {
    const addData = async () => {
      const { data: links } = await supabase
        .from("links")
        .select(
          `
        id,
        title,
        link,
        category:link_categories(
          id,
          name
        )
      `
        )
        .eq("category_id", categoryId);

      if (links !== null) {
        dispatch(setLinks(links));
      } else {
        dispatch(setLinks([]));
      }
    };

    addData();
  };
