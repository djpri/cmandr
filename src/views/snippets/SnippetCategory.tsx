import {
  Box,
  Grid,
  GridItem,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import AddCategory from "components/categories/AddCategory";
import CategoryLinkButton from "components/other/CategoryLinkButton";
import EditableCategory from "components/shared/EditableCategory";
import CodeEditor from "components/snippets/CodeEditor";
import AddSnippetButton from "components/snippets/SnippetsManager/AddSnippetButton";
import SnippetsManager from "components/snippets/SnippetsManager/SnippetsManager";
import useSnippets from "hooks/entities/useSnippets";
import { ForwardedRef, useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { selectCode, selectLanguage, setCode } from "redux/slices/editorSlice";
import { useAppDispatch, useAppSelector } from "redux/store";
import EntityPage from "views/EntityPage";
import useCategories from "../../hooks/categories/useCategories";

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
    return <Spinner />;
  }

  return (
    <EntityPage
      numItems={category?.items}
      headerOptions={
        <Box m="0" p="0">
          <EditableCategory
            category={category}
            entity="snippet"
          />
        </Box>
      }
    >
    
      {query.isLoading && <Spinner mb={5} />}
      {!category?.isGroup && category?.items > 0 && (
        <>
          <AddSnippetButton
            ref={addSnippetRef as ForwardedRef<HTMLDivElement>}
            currentButtonOpen={currentButtonOpen}
            setCurrentButtonOpen={setCurrentButtonOpen}
            categoryId={category ? category.id : null}
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
                height="80vh"
                readonly
              />
            </GridItem>
          </Grid>
        </>
      )}

      {!category?.isGroup && !category?.items && !query.isLoading && (
        <>
          <AddSnippetButton
            ref={addSnippetRef as ForwardedRef<HTMLDivElement>}
            currentButtonOpen={currentButtonOpen}
            setCurrentButtonOpen={setCurrentButtonOpen}
            categoryId={category ? category.id : null}
          />
          <Box ref={addSnippetRef} mb={5} />
          <div>
            No snippets have been added yet. Add a new snippet using the button
            above.
          </div>
        </>
      )}

      {subCategories && (
        <Grid my="30px" gap={3} templateColumns="repeat(auto-fill, 250px)">
          {subCategories.map((item) => (
            <CategoryLinkButton
              item={item}
              entityType="snippet"
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
