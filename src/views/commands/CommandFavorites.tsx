import { Heading, Text } from "@chakra-ui/react";
import CommandsManager from "components/commands/CommandsManager/CommandsManager";
import QueryState from "components/other/QueryState";
import useCommands from "hooks/entities/useCommands";
import EntityPage from "views/EntityPage";

function Favorites() {
  const { query } = useCommands();
  const favoritesCount =
    query.data?.filter((item) => item.starred === true).length ?? 0;

  const HeaderOptions = () => (
    <Heading as="h2" fontWeight="900" fontSize="2xl">
      Favorite Commands
    </Heading>
  );

  return (
    <EntityPage
      numItems={favoritesCount}
      headerOptions={<HeaderOptions />}
    >
      <QueryState
        query={query}
        loadingText="Loading favorite commands"
        emptyMessage="No commands found."
      >
        {(commands) => {
          const starredItems = commands.filter((item) => item.starred);
          if (starredItems.length === 0) {
            return (
              <Text color="gray.400" py={2}>
                No favorite commands yet.
              </Text>
            );
          }
          return <CommandsManager commands={starredItems} />;
        }}
      </QueryState>
    </EntityPage>
  );
}

export default Favorites;
