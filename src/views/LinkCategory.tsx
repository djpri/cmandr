import { Heading, Stack } from "@chakra-ui/layout";
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
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import CategoryLinkButton from "components/other/CategoryLinkButton";
import useLinkCategories from "hooks/links/useLinkCategories";
import useLinksFromSingleCategory from "hooks/links/useLinksFromSingleCategory";
import { useMemo } from "react";
import { FaEdit } from "react-icons/fa";
import { useParams } from "react-router-dom";
import UserLayout from "../components/layout/UserLayout";
import DeleteLinkCategory from "../components/linkCategories/DeleteLinkCategory/DeleteLinkCategory";
import EditLinkCategory from "../components/linkCategories/EditLinkCategory/EditLinkCategory";
import LinksManager from "../components/links/LinksManager/LinksManager";

function LinkCategory() {
  const { id: categoryId } = useParams();
  const { query } = useLinksFromSingleCategory(parseInt(categoryId));
  const { query: categoriesQuery } = useLinkCategories();

  const {
    isOpen: isEditModalOpen,
    onOpen: editModalOpen,
    onClose: editModalClose,
  } = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure();

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
    <UserLayout>
      <Stack mb="5px" display="flex" alignItems="center" direction="row">
        <Heading as="h2" fontWeight="900" fontSize="3xl">
          {category ? category.name : ""}
        </Heading>
        <Box m="0" p="0">
          <Popover placement="right">
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
        </Box>
      </Stack>
      <Text mb="30px" color="gray.500" fontWeight="700">
        {category && category.items} items
      </Text>
      <DeleteLinkCategory
        isOpen={isOpen}
        onClose={onClose}
        categoryName={category ? category.name : null}
        categoryId={parseInt(categoryId)}
      />
      <EditLinkCategory
        isOpen={isEditModalOpen}
        onClose={editModalClose}
        categoryId={parseInt(categoryId)}
      />
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
              type="links"
              key={item.id}
              hue="201"
            />
          ))}
        </Grid>
      )}
    </UserLayout>
  );
}

export default LinkCategory;
