import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CommandCategories, LinkCategories, SnippetCategories } from "api";
import { asReactQueryFunction } from "helpers/asReactQueryFunction";
import { CategoryReadDto } from "models/category";
import { Entity } from "models/entity";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUserHasReceivedToken } from "redux/slices/appSlice";
import useChakraToast from "../other/useChakraToast";

const getCategoryInfo = (entity: Entity) => {
  if (entity === "command") {
    return {
      queryKey: ["commandCategories"],
      endpoints: CommandCategories,
    };
  }
  if (entity === "link") {
    return {
      queryKey: ["linkCategories"],
      endpoints: LinkCategories,
    };
  }
  if (entity === "snippet") {
    return {
      queryKey: ["snippetCategories"],
      endpoints: SnippetCategories,
    };
  }
};

function useCategories(entity: Entity) {
  const queryClient = useQueryClient();
  const isAppInitalized: boolean = useSelector(selectUserHasReceivedToken);
  const { showErrorToast } = useChakraToast();
  const [{ endpoints, queryKey }] = useState(getCategoryInfo(entity));

  // Queries
  const query = useQuery([queryKey], asReactQueryFunction(endpoints.getAll), {
    enabled: isAppInitalized,
  });

  // Mutations
  // Note: mutation functions can only take ONE parameter
  const addCategoryMutation = useMutation(endpoints.create, {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKey]);
    },
    onError: showErrorToast,
  });
  const editCategoryMutation = useMutation(endpoints.update, {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKey]);
    },
    onError: showErrorToast,
  });
  const deleteCategoryMutation = useMutation(endpoints.remove, {
    onMutate: (id) => {
      queryClient.cancelQueries([queryKey]);
      const previousCategories = queryClient.getQueryData([queryKey]);
      queryClient.setQueryData([queryKey], (old: CategoryReadDto[]) => {
        return old.filter((category: CategoryReadDto) => category.id !== id);
      });
      return () => queryClient.setQueryData([queryKey], previousCategories);
    },
    onError: () => {
      queryClient.invalidateQueries([queryKey]);
      showErrorToast();
    },
  });
  const manualSortMutation = useMutation(endpoints.manualSort, {
    onSuccess: () => {
      queryClient.refetchQueries(["settings"]);
      queryClient.invalidateQueries([queryKey]);
    },
    onError: showErrorToast,
  });

  return {
    query,
    addCategoryMutation,
    editCategoryMutation,
    deleteCategoryMutation,
    manualSortMutation,
  };
}

export default useCategories;
