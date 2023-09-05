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
import AddCategory from "components/categories/AddCategory";
import DeleteCategoryModal from "components/categories/DeleteCategoryModal";
import EditCategory from "components/categories/EditCategory";
import LinksManager from "components/links/LinksManager/LinksManager";
import CategoryLinkButton from "components/other/CategoryLinkButton";
import useLinks from "hooks/entities/useLinks";
import { CategoryReadDto } from "models/category";
import { useMemo } from "react";
import { FaEdit } from "react-icons/fa";
import { useParams } from "react-router-dom";
import EntityPage from "views/EntityPage";
import useCategories from "../../hooks/categories/useCategories";

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
      <DeleteCategoryModal
        entityType="link"
        isOpen={isOpen}
        onClose={onClose}
        categoryName={category ? category.name : null}
        categoryId={parseInt(categoryId)}
      />
      <EditCategory
        entityType="link"
        isOpen={isEditModalOpen}
        onClose={editModalClose}
        category={category}
      />
    </Box>
  );
};

function LinkCategory() {
  const { id: categoryId } = useParams();
  const { query } = useLinks(parseInt(categoryId));
  const { query: categoriesQuery } = useCategories("link");

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
    return <Spinner />;
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
        <LinksManager
          categoryId={category ? category.id : null}
          links={query.data}
        />
      )}
      {subCategories && (
        <Grid my="30px" gap={3} templateColumns="repeat(auto-fill, 250px)">
          {subCategories.map((item) => (
            <CategoryLinkButton
              item={item}
              entityType="link"
              routeType="links"
              key={item.id}
              hue={201}
            />
          ))}
        </Grid>
      )}
      {category.isGroup && (
        <VStack spacing={2} my={5} align="flex-start">
          <AddCategory parentId={category.id} entityType="link" />
        </VStack>
      )}
    </EntityPage>
  );
}

export default LinkCategory;
