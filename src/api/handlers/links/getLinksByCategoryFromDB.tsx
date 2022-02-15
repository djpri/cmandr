import { setLinks } from "../../../redux/links/linksSlice";
import { AppThunk } from "../../../redux/store";
import { supabase } from "../../../supabase/supabase";

export const getLinksByCategoryFromDB =
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
        favicon_url,
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
