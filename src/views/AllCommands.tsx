import { Heading } from "@chakra-ui/react";
import useCommands from "hooks/commands/useCommands";
import CommandsManager from "../components/commands/CommandsManager/CommandsManager";
import UserLayout from "../components/layout/UserLayout";

function AllCommandsPage() {
  const { query } = useCommands();

  return (
    <UserLayout>
      <Heading as="h2" mb="30px" fontWeight="900">
        All Commands
      </Heading>
      {query.data && <CommandsManager commands={query.data} />}
    </UserLayout>
  );
}

export default AllCommandsPage;
