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
import AddCategory from "components/categories/AddCategory";
import DeleteCategoryModal from "components/categories/DeleteCategoryModal";
import EditCategory from "components/categories/EditCategory";
import CommandsManager from "components/commands/CommandsManager/CommandsManager";
import UserLayout from "components/layout/UserLayout";
import CategoryLinkButton from "components/other/CategoryLinkButton";
import useCategories from "hooks/categories/useCategories";
import useCommands from "hooks/entities/useCommands";
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
  const { query } = useCommands(parseInt(categoryId));
  const { query: categoriesQuery } = useCategories("command");

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
        entityType="command"
      />
      <EditCategory
        isOpen={isEditModalOpen}
        onClose={editModalClose}
        category={category}
        entityType="command"
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
              entityType="command"
              routeType="commands"
              key={item.id}
              hue={201}
            />
          ))}
        </Grid>
      )}
      {category.isGroup && (
        <VStack spacing={2} my={5} align="flex-start">
          <AddCategory parentId={category.id} entityType="command" />
        </VStack>
      )}
    </EntityPage>
  );
}

export default CommandCategoryPage;
