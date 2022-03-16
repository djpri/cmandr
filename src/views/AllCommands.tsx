import { Heading } from "@chakra-ui/react";
import useCommands from "hooks/useCommands";
import CommandsList from "../components/commands/CommandsList/CommandsList";
import UserLayout from "../components/layout/UserLayout";

function AllCommandsPage() {
  const { query } = useCommands();

  return (
    <UserLayout>
      <Heading as="h2" mb="30px" fontWeight="900">
        All Commands
      </Heading>
      {query.data && <CommandsList commands={query.data} />}
    </UserLayout>
  );
}

export default AllCommandsPage;
