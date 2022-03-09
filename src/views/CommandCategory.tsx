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
import { useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CommandsList from "../components/commands/CommandsList/CommandsList";
import DeleteCategoryModal from "../components/commands/DeleteCommandCategory/DeleteCategoryModal";
import EditCommandCategory from "../components/commands/EditCommandCategory/EditCommandCategory";
import { getCommandsByCategoryFromDB } from "../api/handlers/commands/getCommandsByCategoryFromDB";
import UserLayout from "../components/layout/UserLayout";
import { selectCategoriesAsKeyValuePairs } from "../redux/commands/commandsSlice";

function CommandCategoryPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isEditModalOpen,
    onOpen: editModalOpen,
    onClose: editModalClose,
  } = useDisclosure();

  const categoryList = useSelector(selectCategoriesAsKeyValuePairs);
  const params: { id: string } = useParams();
  const categoryName = categoryList[params.id] || "";
  const itemCount = categoryList[params.id].items || "0";
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCommandsByCategoryFromDB(parseInt(params.id)));
  }, [dispatch, params.id]);

  return (
    <UserLayout>
      <Stack mb="5px" display="flex" alignItems="center" direction="row">
        <Heading as="h2" fontWeight="900">
          {categoryName}
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
        {itemCount} items
      </Text>
      <CommandsList showCategories={false} />
      <DeleteCategoryModal
        isOpen={isOpen}
        onClose={onClose}
        categoryName={categoryName}
        categoryId={parseInt(params.id)}
      />
      <EditCommandCategory
        isOpen={isEditModalOpen}
        onClose={editModalClose}
        categoryId={parseInt(params.id)}
      />
    </UserLayout>
  );
}

export default CommandCategoryPage;
