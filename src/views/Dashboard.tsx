import {
  Box,
  Button,
  Grid,
  Heading,
  useColorModeValue,
  Wrap,
} from "@chakra-ui/react";
import CategoryLinkButton from "components/other/CategoryLinkButton";
import useSortCategories from "hooks/categories/useSortCategories";
import useCommandCategories from "hooks/commands/useCommandCategories";
import useLinkCategories from "hooks/links/useLinkCategories";
import useSettings from "hooks/settings/useSettings";
import { CategoryReadDto } from "models/category";
import { UserSettings } from "models/user";
import { FC, useMemo } from "react";
import UserLayout from "../components/layout/UserLayout";

type SortButtonProps = {
  type: "command" | "link";
  settings: UserSettings;
};

function Dashboard() {
  const { query: commandCategoryQuery } = useCommandCategories();
  const { query: linkCategoryQuery } = useLinkCategories();
  const { query: settingsQuery } = useSettings();

  const baseHue = 184;

  const SortButtons: FC<SortButtonProps> = ({ type, settings }) => {
    const {
      sortCategoriesAscending,
      sortCategoriesDescending,
      sortCategoriesByItemCount,
    } = useSortCategories(type);
    const selectedSortBgColor = useColorModeValue("gray.100", "teal.600");
    const sortSetting =
      type === "command"
        ? settings.commandCategoriesSort
        : settings.linkCategoriesSort;

    const noCategoryData =
      !commandCategoryQuery.data || !linkCategoryQuery.data;

    return (
      <Wrap my={4}>
        <Button
          variant="options"
          bgColor={sortSetting === "ascending" && selectedSortBgColor}
          onClick={sortCategoriesAscending}
          disabled={noCategoryData || sortSetting === "ascending"}
        >
          Sort A-Z
        </Button>
        <Button
          variant="options"
          bgColor={sortSetting === "descending" && selectedSortBgColor}
          onClick={sortCategoriesDescending}
          disabled={noCategoryData || sortSetting === "descending"}
        >
          Sort Z-A
        </Button>
        <Button
          variant="options"
          bgColor={sortSetting === "size" && selectedSortBgColor}
          onClick={sortCategoriesByItemCount}
          disabled={noCategoryData || sortSetting === "size"}
        >
          Sort by size
        </Button>
      </Wrap>
    );
  };

  const commandCategories = useMemo(() => {
    if (commandCategoryQuery.data?.length <= 0) return [];
    return commandCategoryQuery.data?.filter((c) => c.parentId >= 0);
  }, [commandCategoryQuery]);

  const linkCategories = useMemo(() => {
    if (linkCategoryQuery.data?.length <= 0) return [];
    return linkCategoryQuery.data?.filter((c) => c.parentId >= 0);
  }, [linkCategoryQuery]);

  return (
    <UserLayout>
      <Box fontSize="xl">
        <Heading as="h1" fontSize="3xl">Commands</Heading>
        {settingsQuery.data && (
          <SortButtons type="command" settings={settingsQuery.data} />
        )}
        <Grid my="30px" gap={3} templateColumns="repeat(auto-fill, 250px)">
          {commandCategories?.map((item: CategoryReadDto, index: number) => (
            <CategoryLinkButton
              type="commands"
              key={item.id}
              item={item}
              hue={item?.isGroup ? baseHue + index + 80 : baseHue + index}
            />
          ))}
        </Grid>
        <Heading as="h1" fontSize="3xl">Links</Heading>
        {settingsQuery.data && (
          <SortButtons type="link" settings={settingsQuery.data} />
        )}
        <Grid my="30px" gap={3} templateColumns="repeat(auto-fill, 250px)">
          {linkCategories?.map((item: CategoryReadDto, index: number) => (
            <CategoryLinkButton
              type="links"
              key={item.id}
              item={item}
              hue={item?.isGroup ? baseHue + index + 80 : baseHue + index}
            />
          ))}
        </Grid>
      </Box>
    </UserLayout>
  );
}

export default Dashboard;
