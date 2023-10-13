import useLinks from "hooks/entities/useLinks";
import EntityPage from "views/EntityPage";
import LinksManager from "../../components/links/LinksManager/LinksManager";
import { Heading } from "@chakra-ui/react";

// TODO: Add loading spinner when query is loading

function Links() {
  const { query } = useLinks();

  const HeaderOptions = () => (
    <Heading as="h2" fontWeight="900" fontSize="2xl">All Links</Heading>
  );

  return (
    <EntityPage numItems={query?.data && query?.data.length} headerOptions={<HeaderOptions />}>
      <LinksManager links={query?.data} />
    </EntityPage>
  );
}

export default Links;
