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
  HStack,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import useLinkCategories from "hooks/links/useLinkCategories";
import useLinksFromSingleCategory from "hooks/links/useLinksFromSingleCategory";
import React, { useEffect, useState } from "react";
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
  const [category, setCategory] = useState(null);

  useEffect(() => {
    setCategory(
      categoriesQuery.data?.find((item) => item.id === parseInt(categoryId))
    );
  }, [categoryId, categoriesQuery.data]);

  return (
    <UserLayout>
      <Stack mb="5px" display="flex" alignItems="center" direction="row">
        <Heading as="h2" fontWeight="900">
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
      {query.isLoading && <Spinner />}

      {query.data && (
        <LinksManager
          categoryId={category ? category.id : null}
          links={query.data}
        />
      )}
    </UserLayout>
  );
}

export default LinkCategory;
