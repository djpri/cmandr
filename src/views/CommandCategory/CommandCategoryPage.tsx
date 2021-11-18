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
  useDisclosure,
} from "@chakra-ui/react";
import * as React from "react";
import CommandsList from "../../components/commands/CommandsList/CommandsList";
import UserLayout from "../../layout/UserLayout";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCategoriesAsKeyValuePairs } from "../../redux/commands/commandsSlice";
import { FaEdit } from "react-icons/fa";
import DeleteCategoryModal from "../../components/commands/DeleteCommandCategory/DeleteCategoryModal";
import { selectUserUid } from "../../redux/auth/authSlice";
import { getCommandsByCategoryFromDB } from "../../services/commands/getCommandsByCategoryFromDB";
import EditCommandCategory from "../../components/commands/EditCommandCategory/EditCommandCategory";

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
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector(selectUserUid);

  React.useEffect(() => {
    console.log("getting new commands");
    dispatch(getCommandsByCategoryFromDB(parseInt(params.id)));
  }, [dispatch, params.id]);

  return (
    <UserLayout>
      <Stack mb="30px" display="flex" alignItems="center" direction="row">
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
