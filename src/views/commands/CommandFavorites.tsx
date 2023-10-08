import { Heading } from "@chakra-ui/react";
import CommandsManager from "components/commands/CommandsManager/CommandsManager";
import useCommands from "hooks/entities/useCommands";
import { useMemo } from "react";
import EntityPage from "views/EntityPage";

function Favorites() {
  const { query } = useCommands();

  const HeaderOptions = () => (
    <Heading as="h2" fontWeight="900" fontSize="2xl">
      Favorite Commands
    </Heading>
  );

  const starredItems = useMemo(() => {
    if (query.data) {
      return query.data.filter((item) => item.starred);
    }
  }, [query]);

  return (
    <EntityPage
      numItems={starredItems && starredItems.length}
      headerOptions={<HeaderOptions />}
    >
      {starredItems && <CommandsManager commands={starredItems} />}
    </EntityPage>
  );
}

export default Favorites;
