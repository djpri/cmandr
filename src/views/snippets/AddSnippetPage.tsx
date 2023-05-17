import { Box, Heading } from "@chakra-ui/react";
import UserLayout from "components/layout/UserLayout";
import AddSnippetForm from "components/snippets/AddSnippetForm/AddSnippetForm";

// TODO: Add loading spinner when query is loading

function AddSnippetPage() {
  return (
    <UserLayout>
      <Box>
        <Heading mb={8} fontSize="3xl">
          Add Snippet
        </Heading>
        <AddSnippetForm />
      </Box>
    </UserLayout>
  );
}

export default AddSnippetPage;
