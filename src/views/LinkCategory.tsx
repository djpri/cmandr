import { Heading, Stack } from "@chakra-ui/layout";
import {
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/popover";
import { Box, Button, HStack, useDisclosure, Text } from "@chakra-ui/react";
import useLinkCategories from "hooks/useLinkCategories";
import useLinksFromSingleCategory from "hooks/useLinksFromSingleCategory";
import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useParams } from "react-router-dom";
import UserLayout from "../components/layout/UserLayout";
import DeleteLinkCategory from "../components/linkCategories/DeleteLinkCategory/DeleteLinkCategory";
import EditLinkCategory from "../components/linkCategories/EditLinkCategory/EditLinkCategory";
import LinksList from "../components/links/LinksList/LinksList";

function LinkCategory() {
  const { id: categoryId } = useParams();
  const { query } = useLinksFromSingleCategory(parseInt(categoryId));
  const { query: categoriesQuery } = useLinkCategories();
  const categoryName = "";

  const {
    isOpen: isEditModalOpen,
    onOpen: editModalOpen,
    onClose: editModalClose,
  } = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [category, setCategory] = useState(null);

  useEffect(() => {
    setCategory(
      categoriesQuery.data.find((item) => item.id === parseInt(categoryId))
    );
  }, [categoryId, categoriesQuery.data]);

  return (
    <UserLayout>
      <Stack mb="30px" display="flex" alignItems="center" direction="row">
        <Heading as="h2" fontWeight="900">
          {category ? category.name : ""}
        </Heading>
        <Box m="0" p="0">
          <Popover placement="right">
            <PopoverTrigger>
              <Button>
                <FaEdit />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverBody>
                <HStack>
                  <Button size="xs" onClick={editModalOpen}>
                    edit
                  </Button>
                  <Button size="xs" onClick={onOpen}>
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
      <LinksList showCategories={false} links={query.data} />
      <DeleteLinkCategory
        isOpen={isOpen}
        onClose={onClose}
        categoryName={categoryName}
        categoryId={parseInt(categoryId)}
      />
      <EditLinkCategory
        isOpen={isEditModalOpen}
        onClose={editModalClose}
        categoryId={parseInt(categoryId)}
      />
    </UserLayout>
  );
}

export default LinkCategory;
