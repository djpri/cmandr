import { Commands } from "api";
import { asReactQueryFunction } from "helpers/helpers";
import { useQuery } from "react-query";

function useCommandsFromSingleCategory({ categoryId }) {
  const singleCategoryCommandsQuery = useQuery(
    ["commands", categoryId],
    asReactQueryFunction(() => Commands.getAllByCategoryId(categoryId))
  );
  return singleCategoryCommandsQuery;
}

export default useCommandsFromSingleCategory;
