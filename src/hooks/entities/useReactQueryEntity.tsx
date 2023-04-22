/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CategoryReadDto } from "models/category";
import { EntityReadDto, EntityUpdateDto } from "models/entity";
import { useSelector } from "react-redux";
import { selectUserHasReceivedToken } from "redux/slices/appSlice";
import useChakraToast from "../other/useChakraToast";

type SnapshotData<T> = {
  entities: T[];
  categories: CategoryReadDto[];
};

type MutationEndpoints = {
  create: (newEntity: any) => Promise<any>;
  update: (updatedEntity: any) => Promise<any>;
  remove: (id: number) => Promise<any>;
};

type Props = {
  queryKey: (string | number)[];
  categoryQueryKey: (string | number)[];
  queryFunction: (params: any) => Promise<any>;
  endpoints: MutationEndpoints;
};

const CategoriesUpdater = {
  add: (categories, newItemCategoryId) =>
    categories.map((category) => {
      if (category.id === newItemCategoryId) {
        return { ...category, items: category.items + 1 };
      } else {
        return category;
      }
    }),
  remove: (categories, newItemCategoryId) =>
    categories.map((category) => {
      if (category.id === newItemCategoryId) {
        return { ...category, items: category.items - 1 };
      } else {
        return category;
      }
    }),
};

const mapToReadDto = (
  updatedEntity: EntityUpdateDto,
  readDto: EntityReadDto
) => {
  return {
    ...readDto,
    ...updatedEntity,
  };
};

function useReactQueryEntity<T extends EntityReadDto>({
  queryKey,
  categoryQueryKey,
  queryFunction,
  endpoints,
}: Props) {
  const queryClient = useQueryClient();
  const { showErrorToast } = useChakraToast();
  const isAppInitalized: boolean = useSelector(selectUserHasReceivedToken);

  const query = useQuery(queryKey, queryFunction, { enabled: isAppInitalized });

  const snapshotPreviousData = (): SnapshotData<T> => {
    return {
      entities: queryClient.getQueryData(queryKey) || [],
      categories: queryClient.getQueryData(categoryQueryKey) || [],
    };
  };

  const defaultMutationSettings = {
    onSuccess: async () => {
      await queryClient.invalidateQueries(queryKey);
      await queryClient.invalidateQueries(categoryQueryKey);
    },
    onError: showErrorToast,
  };

  const addMutation = useMutation(endpoints.create, {
    onMutate: async (newCommand) => {
      await queryClient.cancelQueries(categoryQueryKey);
      const snapshot = snapshotPreviousData();

      // Optimistically update to the new value
      queryClient.setQueryData(categoryQueryKey, (categories) =>
        CategoriesUpdater.add(categories, newCommand.categoryId)
      );

      return snapshot;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(queryKey);
    },
    onError: async () => {
      await queryClient.invalidateQueries(categoryQueryKey);
      showErrorToast();
    },
  });

  const editMutation = useMutation(endpoints.update, {
    onMutate: async (updatedEntityRequest: {
      id: number;
      body: EntityUpdateDto;
    }) => {
      await queryClient.cancelQueries(categoryQueryKey);
      const snapshot = snapshotPreviousData();

      const currentEntity = (queryClient.getQueryData(queryKey) as T[]).find(
        (item) => item.id === updatedEntityRequest.id
      );

      const itemHasMovedCategory =
        currentEntity.category.id !== updatedEntityRequest.body.categoryId;

      if (itemHasMovedCategory) {
        // remove item from old category count
        queryClient.setQueryData(
          categoryQueryKey,
          (categories: CategoryReadDto[]) =>
            CategoriesUpdater.remove(categories, currentEntity.category.id)
        );

        // remove item from old category list
        queryClient.setQueryData(
          [queryKey[0], currentEntity.category.id],
          (commands: T[]) => {
            return commands.filter(
              (command) => command.id !== updatedEntityRequest.id
            );
          }
        );

        // add item to new category count
        queryClient.setQueryData(
          categoryQueryKey,
          (categories: CategoryReadDto[]) =>
            CategoriesUpdater.add(
              categories,
              updatedEntityRequest.body.categoryId
            )
        );

        // add item to new category list
        const queryExists = queryClient.getQueryData([
          queryKey[0],
          updatedEntityRequest.body.categoryId,
        ]);

        if (queryExists) {
          queryClient.setQueryData(
            [queryKey[0], updatedEntityRequest.body.categoryId],
            (commands: any[]) => {
              return [
                ...commands,
                mapToReadDto(updatedEntityRequest.body, currentEntity),
              ];
            }
          );
        }
      }

      queryClient.setQueryData(
        [queryKey[0], currentEntity.category.id],
        (commands: any[]) => {
          return commands.map((command) => {
            if (command.id === updatedEntityRequest.id) {
              return mapToReadDto(updatedEntityRequest.body, currentEntity);
            } else {
              return command;
            }
          });
        }
      );

      return snapshot;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(queryKey);
      await queryClient.invalidateQueries(categoryQueryKey);
    },
    onError: async () => {
      await queryClient.invalidateQueries(queryKey);
      await queryClient.invalidateQueries(categoryQueryKey);
      showErrorToast();
    },
  });

  const deleteMutation = useMutation(endpoints.remove, {
    onMutate: async (entityId) => {
      await queryClient.cancelQueries(categoryQueryKey);
      const snapshot = snapshotPreviousData();

      const currentEntity = (queryClient.getQueryData(queryKey) as T[]).find(
        (item) => item.id === entityId
      );

      queryClient.setQueryData(
        categoryQueryKey,
        (categories: CategoryReadDto[]) =>
          CategoriesUpdater.remove(categories, currentEntity.category.id)
      );

      try {
        queryClient.setQueryData(
          [queryKey[0], currentEntity.category.id],
          (items: T[]) => {
            return items?.filter((item) => item.id !== entityId);
          }
        );
      } catch (error) {
        queryClient.setQueryData(
          [queryKey[0]],
          (items: T[]) => {
            return items?.filter((item) => item.id !== entityId);
          }
        );
      }

      return snapshot;
    },
    onError: async () => {
      await queryClient.invalidateQueries(categoryQueryKey);
      await queryClient.invalidateQueries(queryKey);
      showErrorToast();
    },
  });

  return {
    query,
    queryClient,
    showErrorToast,
    snapshotPreviousData,
    defaultMutationSettings,
    addMutation,
    editMutation,
    deleteMutation,
  };
}

export default useReactQueryEntity;
