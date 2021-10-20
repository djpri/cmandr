import { Heading } from "@chakra-ui/react";
import * as React from "react";
import CommandsList from "../../components/CommandsList/CommandsList";
import UserLayout from "../../layouts/UserLayout";

function CommandCategoryPage() {
  return (
    <UserLayout>
      <Heading as="h2" mb="30px" fontWeight="900">
        id
      </Heading>
      <CommandsList />
    </UserLayout>
  );
}

export default CommandCategoryPage;
