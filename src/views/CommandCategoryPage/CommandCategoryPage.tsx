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
import UserLayout from "../../layouts/UserLayout";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCommandsByCategory } from "../../redux/commands/commandsSlice";
import { FaEdit } from "react-icons/fa";
import DeleteCategoryModal from "../../components/shared/DeleteCategoryModal/DeleteCategoryModal";

function CommandCategoryPage({ category }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const params: { id: string } = useParams();
  const categoryName = params.id.replace("-", " ");
  const reduxCommands = useSelector((state) =>
    selectCommandsByCategory(state, params.id)
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
      />
    </UserLayout>
  );
}

export default CommandCategoryPage;
