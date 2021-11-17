import { Heading, Stack } from "@chakra-ui/layout";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
} from "@chakra-ui/popover";
import { Box, Button, HStack, useDisclosure } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import LinksList from "../../components/links/LinksList/LinksList";
import UserLayout from "../../layout/UserLayout";
import { selectUserUid } from "../../redux/auth/authSlice";
import { selectLinksCategoriesAsObject } from "../../redux/links/linksSlice";
import { getLinksByCategoryFromDB } from "../../services/links/getLinksByCategoryFromDB";

function LinkCategory() {
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector(selectUserUid);
  const params: { id: string } = useParams();
  const linkCategories = useSelector(selectLinksCategoriesAsObject);
  const {
    isOpen: isEditModalOpen,
    onOpen: editModalOpen,
    onClose: editModalClose,
  } = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    dispatch(getLinksByCategoryFromDB(parseInt(params.id)));
    console.log(location);
  }, [dispatch, user, location, params.id]);

  return (
    <UserLayout>
      <Stack mb="30px" display="flex" alignItems="center" direction="row">
        <Heading as="h2" fontWeight="900">
          {linkCategories[params.id]}
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
      <LinksList showCategories={false} />
    </UserLayout>
  );
}

export default LinkCategory;
