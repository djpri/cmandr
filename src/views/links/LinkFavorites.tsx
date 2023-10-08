import { Heading } from "@chakra-ui/react";
import LinksManager from "components/links/LinksManager/LinksManager";
import useLinks from "hooks/entities/useLinks";
import { useMemo } from "react";
import EntityPage from "views/EntityPage";

function Favorites() {
  const { query } = useLinks();

  const HeaderOptions = () => (
    <Heading as="h2" fontWeight="900" fontSize="2xl">
      Favorite Links
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
      {starredItems && <LinksManager links={starredItems} />}
    </EntityPage>
  );
}

export default Favorites