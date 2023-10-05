import useCommands from "hooks/entities/useCommands";
import EntityPage from "views/EntityPage";
import CommandsManager from "../../components/commands/CommandsManager/CommandsManager";
import { Heading } from "@chakra-ui/react";

// TODO: Add loading spinner when query is loading

function AllCommandsPage() {
  const { query } = useCommands();

  const HeaderOptions = () => (
    <Heading as="h2" fontWeight="900" fontSize="2xl">All Commands</Heading>
  );

  return (
    <EntityPage numItems={query?.data && query.data.length} headerOptions={<HeaderOptions />}>
      <CommandsManager commands={query?.data} />
    </EntityPage>
  );
}

export default AllCommandsPage;
