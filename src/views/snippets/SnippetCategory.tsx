import {
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/popover";
import {
  Box,
  Button,
  Grid,
  GridItem,
  HStack,
  Spinner,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import AddCategory from "components/categories/AddCategory";
import DeleteCategoryModal from "components/categories/DeleteCategoryModal";
import EditCategory from "components/categories/EditCategory";
import UserLayout from "components/layout/UserLayout";
import CategoryLinkButton from "components/other/CategoryLinkButton";
import CodeEditor from "components/snippets/CodeEditor";
import AddSnippetButton from "components/snippets/SnippetsManager/AddSnippetButton";
import SnippetsManager from "components/snippets/SnippetsManager/SnippetsManager";
import useSnippets from "hooks/entities/useSnippets";
import { CategoryReadDto } from "models/category";
import { ForwardedRef, useEffect, useMemo, useRef, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { selectCode, selectLanguage, setCode } from "redux/slices/editorSlice";
import { useAppDispatch, useAppSelector } from "redux/store";
import EntityPage from "views/EntityPage";
import useCategories from "../../hooks/categories/useCategories";

const HeaderOptions = ({
  category,
  categoryId,
}: {
  category: CategoryReadDto;
  categoryId: string;
}) => {
  const {
    isOpen: isEditModalOpen,
    onOpen: editModalOpen,
    onClose: editModalClose,
  } = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box m="0" p="0">
      <Popover placement="right" isLazy>
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
      <DeleteCategoryModal
        isOpen={isOpen}
        onClose={onClose}
        categoryName={category ? category.name : null}
        categoryId={parseInt(categoryId)}
        entityType="snippet"
      />
      <EditCategory
        isOpen={isEditModalOpen}
        onClose={editModalClose}
        category={category}
        entityType="snippet"
      />
    </Box>
  );
};

function SnippetCategory() {
  const { id: categoryId } = useParams();
  const { query } = useSnippets(parseInt(categoryId));
  const { query: categoriesQuery } = useCategories("snippet");
  const code = useAppSelector(selectCode);
  const language = useAppSelector(selectLanguage);

  const [currentButtonOpen, setCurrentButtonOpen] = useState<
    "addSnippet" | "quickAddLink" | "none"
  >("none");
  const addSnippetRef = useRef<HTMLDivElement | null>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setCode(""));
  }, []);

  const category = useMemo(() => {
    if (categoriesQuery.data) {
      return categoriesQuery.data?.find(
        (item) => item.id === parseInt(categoryId)
      );
    }
  }, [categoryId, categoriesQuery.data]);

  const subCategories = useMemo(() => {
    if (!categoriesQuery.data) return null;
    return categoriesQuery.data.filter(
      (item) => item.parentId === parseInt(categoryId)
    );
  }, [categoriesQuery.data, categoryId]);

  if (!query.data || !category) {
    return (
      <UserLayout>
        <Spinner />
      </UserLayout>
    );
  }

  return (
    <EntityPage
      title={category?.name}
      numItems={category?.items}
      headerOptions={
        <HeaderOptions category={category} categoryId={categoryId} />
      }
    >
      {query.isLoading && <Spinner mb={5} />}
      {!category?.isGroup && (
        <>
          <AddSnippetButton
            ref={addSnippetRef as ForwardedRef<HTMLDivElement>}
            currentButtonOpen={currentButtonOpen}
            setCurrentButtonOpen={setCurrentButtonOpen}
          />
          <Box ref={addSnippetRef} mb={5} />
          <Grid
            templateColumns={["1fr", null, null, null, "1fr 1fr"]}
            gap={4}
            top="100px"
          >
            <GridItem>
              <SnippetsManager
                categoryId={category ? category.id : null}
                snippets={query.data}
              />
            </GridItem>
            <GridItem overflowX={"auto"}>
              <CodeEditor
                value={code}
                defaultLanguage={language ?? "javascript"}
                setDefaultLanguage={() => new Error("Not implemented")}
                handleCodeSnippetChange={() => new Error("Not implemented")}
                height="100%"
                readonly
              />
            </GridItem>
          </Grid>
        </>
      )}
      {subCategories && (
        <Grid my="30px" gap={3} templateColumns="repeat(auto-fill, 250px)">
          {subCategories.map((item) => (
            <CategoryLinkButton
              item={item}
              routeType="snippets"
              key={item.id}
              hue={201}
            />
          ))}
        </Grid>
      )}
      {category.isGroup && (
        <VStack spacing={2} my={5} align="flex-start">
          <AddCategory parentId={category.id} entityType="snippet" />
        </VStack>
      )}
    </EntityPage>
  );
}

export default SnippetCategory;
