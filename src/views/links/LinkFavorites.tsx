import { Heading, Text } from "@chakra-ui/react";
import LinksManager from "components/links/LinksManager/LinksManager";
import QueryState from "components/other/QueryState";
import useLinks from "hooks/entities/useLinks";
import EntityPage from "views/EntityPage";

function Favorites() {
  const { query } = useLinks();
  const favoritesCount =
    query.data?.filter((item) => item.starred === true).length ?? 0;

  const HeaderOptions = () => (
    <Heading as="h2" fontWeight="900" fontSize="2xl">
      Favorite Links
    </Heading>
  );

  return (
    <EntityPage
      numItems={favoritesCount}
      headerOptions={<HeaderOptions />}
    >
      <QueryState
        query={query}
        loadingText="Loading favorite links"
        emptyMessage="No links found."
      >
        {(links) => {
          const starredItems = links.filter((item) => item.starred);
          if (starredItems.length === 0) {
            return (
              <Text color="gray.400" py={2}>
                No favorite links yet.
              </Text>
            );
          }
          return <LinksManager links={starredItems} />;
        }}
      </QueryState>
    </EntityPage>
  );
}

export default Favorites;
