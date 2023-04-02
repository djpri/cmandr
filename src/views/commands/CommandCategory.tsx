import {
  Box,
  Button,
  Grid,
  HStack,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Spinner,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import AddCommandCategory from "components/commandCategories/AddCommandCategory";
import DeleteCategoryModal from "components/commandCategories/DeleteCategoryModal";
import EditCommandCategory from "components/commandCategories/EditCommandCategory";
import CommandsManager from "components/commands/CommandsManager/CommandsManager";
import UserLayout from "components/layout/UserLayout";
import CategoryLinkButton from "components/other/CategoryLinkButton";
import useCommandCategories from "hooks/commands/useCommandCategories";
import useCommandsFromSingleCategory from "hooks/commands/useCommandsFromSingleCategory";
import { useMemo } from "react";
import { FaEdit } from "react-icons/fa";
import { useParams } from "react-router-dom";
import EntityPage from "views/EntityPage";

function CommandCategoryPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isEditModalOpen,
    onOpen: editModalOpen,
    onClose: editModalClose,
  } = useDisclosure();
  const { id: categoryId } = useParams();
  const { query } = useCommandsFromSingleCategory(parseInt(categoryId));
  const { query: categoriesQuery } = useCommandCategories();

  const category = useMemo(() => {
    if (categoriesQuery.data) {
      return categoriesQuery.data?.find(
        (item) => item.id === parseInt(categoryId)
      );
    }
  }, [categoryId, categoriesQuery.data]);

  const subCategories = useMemo(() => {
    if (!categoriesQuery.data) return null;
    return categoriesQuery.data.filter(
      (item) => item.parentId === parseInt(categoryId)
    );
  }, [categoriesQuery.data, categoryId]);

  if (!query.data || !category) {
    return (
      <UserLayout>
        <Spinner />
      </UserLayout>
    );
  }

  const HeaderOptions = () => (
    <Box m="0" p="0">
      <Popover placement="right" isLazy>
        <PopoverTrigger>
          <Button boxShadow="outline">
            <FaEdit />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverBody>
            <HStack>
              <Button size="xs" onClick={editModalOpen}>
                rename
              </Button>
              <Button size="xs" onClick={onOpen} variant="delete">
                delete
              </Button>
            </HStack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <DeleteCategoryModal
        isOpen={isOpen}
        onClose={onClose}
        categoryName={category ? category.name : null}
        categoryId={parseInt(categoryId)}
      />
      <EditCommandCategory
        isOpen={isEditModalOpen}
        onClose={editModalClose}
        category={category}
        categoryId={parseInt(categoryId)}
      />
    </Box>
  );

  return (
    <EntityPage
      numItems={category?.items}
      title={category?.name}
      headerOptions={<HeaderOptions />}
    >
      {query.isLoading && <Spinner mb={5} />}
      {!category?.isGroup && (
        <CommandsManager
          categoryId={category ? category.id : null}
          commands={query.data}
        />
      )}
      {subCategories && (
        <Grid my="30px" gap={3} templateColumns="repeat(auto-fill, 250px)">
          {subCategories.map((item) => (
            <CategoryLinkButton
              item={item}
              routeType="commands"
              key={item.id}
              hue={201}
            />
          ))}
        </Grid>
      )}
      {category.isGroup && (
        <VStack spacing={2} my={5} align="flex-start">
          <AddCommandCategory parentId={category.id} />
        </VStack>
      )}
    </EntityPage>
  );
}

export default CommandCategoryPage;
