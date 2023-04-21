import { Links } from "api";
import { asReactQueryFunction } from "helpers/asReactQueryFunction";
import useChakraToast from "hooks/other/useChakraToast";
import { LinkReadDto } from "models/link";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { selectUserHasReceivedToken } from "redux/slices/appSlice";
import { CategoryReadDto } from "../../models/category";

/**
 * Custom hook that contains react query logic for links
 *
 * @example
 *
 * ```js
 * const { query } = useLinks();
 * const links = query.data;
 * ```
 */
function useLinks() {
  const queryClient = useQueryClient();
  const isAppInitialized: boolean = useSelector(selectUserHasReceivedToken);

  const { showSuccessToast, showErrorToast } = useChakraToast();

  // Queries
  const query = useQuery<LinkReadDto[]>(
    ["links"],
    asReactQueryFunction(Links.getAll),
    {
      enabled: isAppInitialized,
    }
  );

  // Mutations
  // Note: mutation functions can only take ONE parameter
  const addLinkMutation = useMutation(Links.create, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(["links"]);
      await queryClient.invalidateQueries(["linkCategories"]);
    },
    onError: showErrorToast,
  });
  const quickAddLinkMutation = useMutation(Links.quickAdd, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(["links"]);
      await queryClient.invalidateQueries(["linkCategories"]);
    },
    onError: showErrorToast,
  });
  const editLinkMutation = useMutation(Links.update, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(["links"]);
      await queryClient.invalidateQueries(["linkCategories"]);
    },
    onError: showErrorToast,
  });
  const deleteLinkMutation = useMutation(Links.remove, {
    onMutate: async (id: number) => {
      const previousLinks: LinkReadDto[] =
        queryClient.getQueryData(["links"]) || [];
      
      queryClient.setQueryData(["links"], (old: LinkReadDto[]) => {
        return old.filter((link: LinkReadDto) => link.id !== id);
      });
      await queryClient.invalidateQueries(["linkCategories"]);
      
      return previousLinks;
    },
    onError: showErrorToast,
  });
  const editMultipleLinksMutation = useMutation(Links.bulkUpdate, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(["links"]);
      await queryClient.invalidateQueries(["linkCategories"]);
    },
    onError: showErrorToast,
  });
  const deleteMultipleLinksMutation = useMutation(Links.bulkRemove, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(["links"]);
      await queryClient.invalidateQueries(["linkCategories"]);
      showSuccessToast("Links Deleted", "Links deleted successfully");
    },
    onError: showErrorToast,
  });

  return {
    query,
    addLinkMutation,
    quickAddLinkMutation,
    editLinkMutation,
    deleteLinkMutation,
    editMultipleLinksMutation,
    deleteMultipleLinksMutation,
  };
}

export default useLinks;
