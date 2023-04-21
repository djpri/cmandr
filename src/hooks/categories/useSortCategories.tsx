import { useQueryClient } from "@tanstack/react-query";
import useSettings from "hooks/settings/useSettings";
import { CategoryReadDto } from "models/category";
import { UserSettings } from "models/user";
import { useMemo } from "react";
import useCategories from "./useCategories";
import { Entity } from "../../models/entity";

type SortType = "manual" | "ascending" | "descending" | "size";

function useSortCategories(type: Entity) {
  const { query: commandCategoryQuery } = useCategories("command");
  const { query: linkCategoryQuery } = useCategories("link");
  const { query: settingsQuery, editSettingsMutation } = useSettings();
  const queryClient = useQueryClient();

  const categories = useMemo(
    () =>
      type === "command" ? commandCategoryQuery.data : linkCategoryQuery.data,
    [commandCategoryQuery.data, linkCategoryQuery.data, type]
  );

  const queryKey = useMemo(
    () => (type === "command" ? "commandCategories" : "linkCategories"),
    [type]
  );

  const settingToUpdate = useMemo(
    () => (type === "command" ? "commandCategoriesSort" : "linkCategoriesSort"),
    [type]
  );

  const updateSettingsAndCategories = (
    sortType: SortType,
    sortFunction: (items: CategoryReadDto[]) => CategoryReadDto[]
  ) => {
    const groups = categories.filter((c: CategoryReadDto) => c?.isGroup);
    const lists = categories.filter((c: CategoryReadDto) => !c?.isGroup);
    const sortedCategories = sortFunction(groups).concat(sortFunction(lists));

    const settings = settingsQuery.data;
    const newSettings: UserSettings = {
      ...settings,
      [settingToUpdate]: sortType,
    };
    settingsQuery.data && editSettingsMutation.mutate(newSettings);
    queryClient.setQueryData([queryKey], sortedCategories);
  };

  const sortCategoriesByDisplayIndex = () => {
    const sortedCategories = (items: CategoryReadDto[]) =>
      items.sort(
        (a: CategoryReadDto, b: CategoryReadDto) =>
          a.displayIndex - b.displayIndex
      );
    const settings = settingsQuery.data;
    const newSettings: UserSettings = {
      ...settings,
      [settingToUpdate]: "manual",
    };
    settingsQuery.data && editSettingsMutation.mutate(newSettings);
    queryClient.setQueryData([queryKey], sortedCategories);
  };

  const sortCategoriesAscending = () => {
    const sort = (items: CategoryReadDto[]) =>
      items.sort((a: CategoryReadDto, b: CategoryReadDto) =>
        a.name.localeCompare(b.name)
      );

    updateSettingsAndCategories("ascending", sort);
  };

  const sortCategoriesDescending = () => {
    const sort = (items: CategoryReadDto[]) =>
      items.sort((a: CategoryReadDto, b: CategoryReadDto) =>
        b.name.localeCompare(a.name)
      );
    updateSettingsAndCategories("descending", sort);
  };

  const sortCategoriesByItemCount = () => {
    const sort = (items: CategoryReadDto[]) =>
      items.sort((a: CategoryReadDto, b: CategoryReadDto) => b.items - a.items);
    updateSettingsAndCategories("size", sort);
  };

  return {
    sortCategoriesAscending,
    sortCategoriesDescending,
    sortCategoriesByItemCount,
    sortCategoriesByDisplayIndex,
  };
}

export default useSortCategories;
