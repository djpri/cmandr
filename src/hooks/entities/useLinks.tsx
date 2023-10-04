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
    addToFavorites,
    removeFromFavorites,
    importBookmarks
  } = Links;

  const queryKey = categoryId ? ["links", categoryId] : ["links"];
  const categoryQueryKey = ["linkCategories"];
  const queryFunction = categoryId
    ? asReactQueryFunction(() => getAllByCategoryId(categoryId))
    : asReactQueryFunction(getAll);

  const {
    query,
    queryClient,
    defaultMutationSettings,
    addMutation,
    editMutation,
    deleteMutation,
    addToFavoritesMutation,
    removeFromFavoritesMutation
  } = useReactQueryEntity<LinkReadDto>({
    queryKey,
    categoryQueryKey,
    queryFunction,
    endpoints: {
      create,
      update,
      remove,
      addToFavorites,
      removeFromFavorites,
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

  const importBookmarksMutation = useMutation(
    importBookmarks,
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries([queryKey]);
        await queryClient.invalidateQueries([categoryQueryKey]);
      }
    }
  );

  return {
    query,
    addLinkMutation: addMutation,
    quickAddLinkMutation,
    editLinkMutation: editMutation,
    deleteLinkMutation: deleteMutation,
    editMultipleLinksMutation,
    deleteMultipleLinksMutation,
    addToFavoritesMutation,
    removeFromFavoritesMutation,
    importBookmarksMutation
  };
}

export default useLinks;
