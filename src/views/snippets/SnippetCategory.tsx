import {
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/popover";
import {
  Box,
  Button,
  Grid,
  HStack,
  Spinner,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import UserLayout from "components/layout/UserLayout";
import CategoryLinkButton from "components/other/CategoryLinkButton";
import AddSnippetCategory from "components/snippetCategories/AddSnippetCategory";
import DeleteSnippetCategory from "components/snippetCategories/DeleteSnippetCategory";
import EditSnippetCategory from "components/snippetCategories/EditSnippetCategory";
import SnippetsManager from "components/snippets/SnippetsManager/SnippetsManager";
import useSnippetCategories from "hooks/snippets/useSnippetCategories";
import useSnippetsFromSingleCategory from "hooks/snippets/useSnippetsFromSingleCategory";
import { CategoryReadDto } from "models/category";
import { useMemo } from "react";
import { FaEdit } from "react-icons/fa";
import { useParams } from "react-router-dom";
import EntityPage from "views/EntityPage";

const HeaderOptions = ({
  category,
  categoryId,
}: {
  category: CategoryReadDto;
  categoryId: string;
}) => {
  const {
    isOpen: isEditModalOpen,
    onOpen: editModalOpen,
    onClose: editModalClose,
  } = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
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
      <DeleteSnippetCategory
        isOpen={isOpen}
        onClose={onClose}
        categoryName={category ? category.name : null}
        categoryId={parseInt(categoryId)}
      />
      <EditSnippetCategory
        isOpen={isEditModalOpen}
        onClose={editModalClose}
        category={category}
      />
    </Box>
  );
};

function SnippetCategory() {
  const { id: categoryId } = useParams();
  const { query } = useSnippetsFromSingleCategory(parseInt(categoryId));
  const { query: categoriesQuery } = useSnippetCategories();

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

  return (
    <EntityPage
      title={category?.name}
      numItems={category?.items}
      headerOptions={
        <HeaderOptions category={category} categoryId={categoryId} />
      }
    >
      {query.isLoading && <Spinner mb={5} />}
      {!category?.isGroup && (
        <SnippetsManager
          categoryId={category ? category.id : null}
          snippets={query.data}
        />
      )}
      {subCategories && (
        <Grid my="30px" gap={3} templateColumns="repeat(auto-fill, 250px)">
          {subCategories.map((item) => (
            <CategoryLinkButton
              item={item}
              routeType="snippets"
              key={item.id}
              hue={201}
            />
          ))}
        </Grid>
      )}
      {category.isGroup && (
        <VStack spacing={2} my={5} align="flex-start">
          <AddSnippetCategory parentId={category.id} />
        </VStack>
      )}
    </EntityPage>
  );
}

export default SnippetCategory;
