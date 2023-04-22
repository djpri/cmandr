import { Links } from "api";
import { asReactQueryFunction } from "helpers/asReactQueryFunction";
import useReactQueryEntity from "hooks/entities/useReactQueryEntity";
import { LinkReadDto } from "models/link";

function useLinks(categoryId?: number) {
  const {
    getAll,
    create,
    quickAdd,
    update,
    remove,
    bulkUpdate,
    bulkRemove,
    getAllByCategoryId,
  } = Links;

  const queryKey = categoryId ? ["links", categoryId] : ["links"];
  const categoryQueryKey = ["linkCategories"];
  const queryFunction = categoryId
    ? asReactQueryFunction(() => getAllByCategoryId(categoryId))
    : asReactQueryFunction(getAll);

  const {
    query,
    useDefaultMutation,
    addMutation,
    deleteMutation,
  } = useReactQueryEntity<LinkReadDto>({
    queryKey,
    categoryQueryKey,
    queryFunction,
    endpoints: {
      create,
      update,
      remove,
    },
  });

  // Mutations
  // Note: mutation functions can only take ONE parameter
  const quickAddLinkMutation = useDefaultMutation(quickAdd);

  const editLinkMutation = useDefaultMutation(update);

  const editMultipleLinksMutation = useDefaultMutation(bulkUpdate);

  const deleteMultipleLinksMutation = useDefaultMutation(bulkRemove);

  return {
    query,
    addLinkMutation: addMutation,
    quickAddLinkMutation,
    editLinkMutation,
    deleteLinkMutation: deleteMutation,
    editMultipleLinksMutation,
    deleteMultipleLinksMutation,
  };
}

export default useLinks;
