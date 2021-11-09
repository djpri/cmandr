import { Heading } from "@chakra-ui/react";
import * as React from "react";
import { useSelector } from "react-redux";
import CommandsList from "../../components/CommandsList/CommandsList";
import UserLayout from "../../layouts/UserLayout";
import { selectCommands } from "../../redux/commands/commandsSlice";

function AllCommandsPage() {
  const reduxCommands = useSelector(selectCommands);

  return (
    <UserLayout>
      <Heading as="h2" mb="30px" fontWeight="900">
        All Commands
      </Heading>
      <CommandsList commands={reduxCommands} showCategories />
    </UserLayout>
  );
}

export default AllCommandsPage;
