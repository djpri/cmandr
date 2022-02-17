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
import { useParams } from "react-router-dom";
import DeleteLinkCategory from "../components/links/DeleteLinkCategory/DeleteLinkCategory";
import EditLinkCategory from "../components/links/EditLinkCategory/EditLinkCategory";
import LinksList from "../components/links/LinksList/LinksList";
import UserLayout from "../components/layout/UserLayout";
import { selectLinksCategoriesAsObject } from "../redux/links/linksSlice";
import { getLinksByCategoryFromDB } from "../api/handlers/links/getLinksByCategoryFromDB";

function LinkCategory() {
  const dispatch = useDispatch();
  const params: { id: string } = useParams();
  const linkCategories = useSelector(selectLinksCategoriesAsObject);
  const categoryName = linkCategories[params.id] || "";

  const {
    isOpen: isEditModalOpen,
    onOpen: editModalOpen,
    onClose: editModalClose,
  } = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    dispatch(getLinksByCategoryFromDB(parseInt(params.id)));
  }, [dispatch, params.id]);

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
      <DeleteLinkCategory
        isOpen={isOpen}
        onClose={onClose}
        categoryName={categoryName}
        categoryId={parseInt(params.id)}
      />
      <EditLinkCategory
        isOpen={isEditModalOpen}
        onClose={editModalClose}
        categoryId={parseInt(params.id)}
      />
    </UserLayout>
  );
}

export default LinkCategory;
