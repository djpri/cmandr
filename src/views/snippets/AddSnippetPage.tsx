import { Box, Heading } from "@chakra-ui/react";
import AddSnippetForm from "components/snippets/AddSnippetForm/AddSnippetForm";

// TODO: Add loading spinner when query is loading

function AddSnippetPage() {
  return (
      <Box>
        <Heading mb={8} fontSize="3xl">
          Add Snippet
        </Heading>
        <AddSnippetForm />
      </Box>
  );
}

export default AddSnippetPage;
