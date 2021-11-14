import { setLinks } from "../../redux/links/linksSlice";
import { AppThunk } from "../../redux/store";
import { supabase } from "../../supabase/supabase";

export const getLinksFromDB = (): AppThunk => async (dispatch) => {
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
      .limit(100);

    if (links !== null) {
      dispatch(setLinks(links));
    } else {
      dispatch(setLinks([]));
    }
  };

  addData();
};
