import QueryState from "components/other/QueryState";
import useCommands from "hooks/entities/useCommands";
import EntityPage from "views/EntityPage";
import CommandsManager from "../../components/commands/CommandsManager/CommandsManager";
import { Heading } from "@chakra-ui/react";

function AllCommandsPage() {
  const { query } = useCommands();

  const HeaderOptions = () => (
    <Heading as="h2" fontWeight="900" fontSize="2xl">All Commands</Heading>
  );

  return (
    <EntityPage
      numItems={query.data?.length ?? 0}
      headerOptions={<HeaderOptions />}
    >
      <QueryState
        query={query}
        loadingText="Loading commands"
        emptyMessage="No commands found yet."
      >
        {(commands) => <CommandsManager commands={commands} />}
      </QueryState>
    </EntityPage>
  );
}

export default AllCommandsPage;
