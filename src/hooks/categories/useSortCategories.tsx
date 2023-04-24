import { useQueryClient } from "@tanstack/react-query";
import { CategoryReadDto } from "models/category";
import useCategories from "./useCategories";
import { Entity } from "../../models/entity";
import { useAppDispatch } from "redux/store";
import { setCategoriesSort } from "redux/slices/settingsSlice";

type SortType = "manual" | "ascending" | "descending" | "size";

const queryKeyDictionary: Record<Entity, string> = {
  command: "commandCategories",
  link: "linkCategories",
  snippet: "snippetCategories",
};

function useSortCategories(type: Entity) {
  const queryClient = useQueryClient();
  const { query } = useCategories(type);
  const dispatch = useAppDispatch();
  const categories = query?.data ?? [];
  const queryKey = queryKeyDictionary[type];

  const updateSettingsAndCategories = (
    sortType: SortType,
    sortFunction: (items: CategoryReadDto[]) => CategoryReadDto[]
  ) => {
    const groups = categories.filter((c: CategoryReadDto) => c?.isGroup);
    const lists = categories.filter((c: CategoryReadDto) => !c?.isGroup);
    const sortedCategories = sortFunction(groups).concat(sortFunction(lists));

    dispatch(setCategoriesSort({ entity: type, sortOption: sortType }));
    queryClient.setQueryData([queryKey], sortedCategories);
  };

  const sortCategoriesByDisplayIndex = () => {
    const sortedCategories = (items: CategoryReadDto[]) =>
      items.sort(
        (a: CategoryReadDto, b: CategoryReadDto) =>
          a.displayIndex - b.displayIndex
      );
    dispatch(setCategoriesSort({ entity: type, sortOption: "manual" }));
    queryClient.setQueryData([queryKey], sortedCategories);
  };

  const sortCategoriesAscending = () => {
    const sortFn = (items: CategoryReadDto[]) =>
      items.sort((a: CategoryReadDto, b: CategoryReadDto) =>
        a.name.localeCompare(b.name)
      );

    updateSettingsAndCategories("ascending", sortFn);
  };

  const sortCategoriesDescending = () => {
    const sortFn = (items: CategoryReadDto[]) =>
      items.sort((a: CategoryReadDto, b: CategoryReadDto) =>
        b.name.localeCompare(a.name)
      );
    updateSettingsAndCategories("descending", sortFn);
  };

  const sortCategoriesByItemCount = () => {
    const sortFn = (items: CategoryReadDto[]) =>
      items.sort((a: CategoryReadDto, b: CategoryReadDto) => b.items - a.items);
    updateSettingsAndCategories("size", sortFn);
  };

  return {
    sortCategoriesAscending,
    sortCategoriesDescending,
    sortCategoriesByItemCount,
    sortCategoriesByDisplayIndex,
  };
}

export default useSortCategories;
