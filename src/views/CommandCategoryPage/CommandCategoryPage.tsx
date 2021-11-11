import {
  Button,
  Heading,
  HStack,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import * as React from "react";
import CommandsList from "../../components/CommandsList/CommandsList";
import UserLayout from "../../layout/UserLayout";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectCategoriesAsKeyValuePairs,
  selectCommandsByCategoryId,
} from "../../redux/commands/commandsSlice";
import { FaEdit } from "react-icons/fa";
import DeleteCategoryModal from "../../components/DeleteCategoryModal/DeleteCategoryModal";
import { RootState } from "../../redux/store";

function CommandCategoryPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const categoryList = useSelector(selectCategoriesAsKeyValuePairs);
  const params: { id: string } = useParams();
  const categoryName = categoryList[params.id] || "";
  const reduxCommands = useSelector((state: RootState) =>
    selectCommandsByCategoryId(state, params.id)
  );

  return (
    <UserLayout>
      <Stack mb="30px" display="flex" alignItems="center" direction="row">
        <Heading as="h2" fontWeight="900">
          {categoryName}
        </Heading>
        <Popover placement="right">
          <PopoverTrigger>
            <Button>
              <FaEdit />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverBody>
              <HStack>
                <Button size="xs">edit</Button>
                <Button size="xs" onClick={onOpen}>
                  delete
                </Button>
              </HStack>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Stack>
      <CommandsList commands={reduxCommands} showCategories={false} />
      <DeleteCategoryModal
        isOpen={isOpen}
        onClose={onClose}
        categoryName={categoryName}
        categoryId={"2"}
      />
    </UserLayout>
  );
}

export default CommandCategoryPage;
