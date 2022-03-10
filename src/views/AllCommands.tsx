import { Heading } from "@chakra-ui/react";
import React from "react";
import CommandsList from "../components/commands/CommandsList/CommandsList";
import UserLayout from "../components/layout/UserLayout";

function AllCommandsPage() {
  return (
    <UserLayout>
      <Heading as="h2" mb="30px" fontWeight="900">
        All Commands
      </Heading>
      <CommandsList showCategories />
    </UserLayout>
  );
}

export default AllCommandsPage;
