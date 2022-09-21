import {
  Box,
  Button,
  Heading,
  HStack,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Spinner,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import useCommandCategories from "hooks/commands/useCommandCategories";
import useCommandsFromSingleCategory from "hooks/commands/useCommandsFromSingleCategory";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useParams } from "react-router-dom";
import DeleteCategoryModal from "../components/commandCategories/DeleteCommandCategory/DeleteCategoryModal";
import EditCommandCategory from "../components/commandCategories/EditCommandCategory/EditCommandCategory";
import CommandsManager from "../components/commands/CommandsManager/CommandsManager";
import UserLayout from "../components/layout/UserLayout";

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
    if (categoriesQuery.data) {
      setCategory(
        categoriesQuery.data?.find((item) => item.id === parseInt(categoryId))
      );
    }
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
      <DeleteCategoryModal
        isOpen={isOpen}
        onClose={onClose}
        categoryName={category ? category.name : null}
        categoryId={parseInt(categoryId)}
      />
      <EditCommandCategory
        isOpen={isEditModalOpen}
        onClose={editModalClose}
        categoryId={parseInt(categoryId)}
      />
      {query.isLoading && <Spinner />}
      {query.data && category && !category?.isGroup && (
        <CommandsManager
          categoryId={category ? category.id : null}
          commands={query.data}
        />
      )}
    </UserLayout>
  );
}

export default CommandCategoryPage;
