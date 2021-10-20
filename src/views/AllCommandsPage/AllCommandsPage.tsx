import { Heading } from "@chakra-ui/react";
import * as React from "react";
import CommandsList from "../../components/CommandsList/CommandsList";
import UserLayout from "../../layouts/UserLayout";

function AllCommandsPage() {
  return (
    <UserLayout>
      <Heading as="h2" mb="30px" fontWeight="900">
        All Commands
      </Heading>
      <CommandsList />
    </UserLayout>
  );
}

export default AllCommandsPage;
