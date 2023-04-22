import { useMutation } from "@tanstack/react-query";
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
    defaultMutationSettings,
    addMutation,
    editMutation,
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
  const quickAddLinkMutation = useMutation(quickAdd, defaultMutationSettings);

  const editMultipleLinksMutation = useMutation(
    bulkUpdate,
    defaultMutationSettings
  );

  const deleteMultipleLinksMutation = useMutation(
    bulkRemove,
    defaultMutationSettings
  );

  return {
    query,
    addLinkMutation: addMutation,
    quickAddLinkMutation,
    editLinkMutation: editMutation,
    deleteLinkMutation: deleteMutation,
    editMultipleLinksMutation,
    deleteMultipleLinksMutation,
  };
}

export default useLinks;
