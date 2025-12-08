import QueryState from "components/other/QueryState";
import useLinks from "hooks/entities/useLinks";
import EntityPage from "views/EntityPage";
import LinksManager from "../../components/links/LinksManager/LinksManager";
import { Heading } from "@chakra-ui/react";

function Links() {
  const { query } = useLinks();

  const HeaderOptions = () => (
    <Heading as="h2" fontWeight="900" fontSize="2xl">All Links</Heading>
  );

  return (
    <EntityPage
      numItems={query.data?.length ?? 0}
      headerOptions={<HeaderOptions />}
    >
      <QueryState
        query={query}
        loadingText="Loading links"
        emptyMessage="No links found yet."
      >
        {(links) => <LinksManager links={links} />}
      </QueryState>
    </EntityPage>
  );
}

export default Links;
