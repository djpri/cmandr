import useCommands from "hooks/entities/useCommands";
import EntityPage from "views/EntityPage";
import CommandsManager from "../../components/commands/CommandsManager/CommandsManager";

function AllCommandsPage() {
  const { query } = useCommands();

  return (
    <EntityPage numItems={query?.data && query.data.length} title="Commands">
      <CommandsManager commands={query?.data} />
    </EntityPage>
  );
}

export default AllCommandsPage;
