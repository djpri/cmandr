import useCommands from "hooks/commands/useCommands";
import EntityPage from "views/EntityPage";
import CommandsManager from "../../components/commands/CommandsManager/CommandsManager";

function AllCommandsPage() {
  const { data } = useCommands();

  return (
    <EntityPage numItems={data && data.length} title="Commands">
      <CommandsManager commands={data} />
    </EntityPage>
  );
}

export default AllCommandsPage;
