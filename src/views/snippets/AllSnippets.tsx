import { Box, Grid, GridItem } from "@chakra-ui/react";
import CodeEditor from "components/snippets/CodeEditor";
import AddSnippetButton from "components/snippets/SnippetsManager/AddSnippetButton";
import SnippetsManager from "components/snippets/SnippetsManager/SnippetsManager";
import useSnippets from "hooks/entities/useSnippets";
import { ForwardedRef, useEffect, useRef, useState } from "react";
import { selectCode, selectLanguage, setCode } from "redux/slices/editorSlice";
import { useAppDispatch, useAppSelector } from "redux/store";
import EntityPage from "views/EntityPage";

function AllSnippets() {
  const { query } = useSnippets();
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

  return (
    <EntityPage numItems={query?.data && query?.data.length} title="Snippets">
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
            <SnippetsManager snippets={query.data} />
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
    </EntityPage>
  );
}

export default AllSnippets;
