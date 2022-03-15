import {
  Box,
  Button,
  Heading,
  HStack,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import * as React from "react";
import { FaEdit } from "react-icons/fa";
import { useParams } from "react-router-dom";
import CommandsList from "../components/commands/CommandsList/CommandsList";
import DeleteCategoryModal from "../components/commands/DeleteCommandCategory/DeleteCategoryModal";
import EditCommandCategory from "../components/commands/EditCommandCategory/EditCommandCategory";
import UserLayout from "../components/layout/UserLayout";
import useCommandsFromSingleCategory from "hooks/useCommandsFromSingleCategory";
import useCommandCategories from "hooks/useCommandCategories";
import { useEffect, useState } from "react";

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
  const [category, setCategory] = useState(null);

  useEffect(() => {
    setCategory(
      categoriesQuery.data.find((item) => item.id === parseInt(categoryId))
    );
  }, [categoryId, categoriesQuery.data]);

  return (
    <UserLayout>
      <Stack mb="5px" display="flex" alignItems="center" direction="row">
        <Heading as="h2" fontWeight="900">
          {/* {query.data && query.data[0]?.category.name} */}
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
      <DeleteCategoryModal
        isOpen={isOpen}
        onClose={onClose}
        categoryName={"categoryName"}
        categoryId={parseInt(categoryId)}
      />
      <EditCommandCategory
        isOpen={isEditModalOpen}
        onClose={editModalClose}
        categoryId={parseInt(categoryId)}
      />
      {query.data && (
        <CommandsList
          categoryId={category ? category.id : null}
          commands={query.data}
        />
      )}
    </UserLayout>
  );
}

export default CommandCategoryPage;
