import useLinks from "hooks/entities/useLinks";
import EntityPage from "views/EntityPage";
import LinksManager from "../../components/links/LinksManager/LinksManager";

// TODO: Add loading spinner when query is loading

function Links() {
  const { query } = useLinks();

  return (
    <EntityPage numItems={query?.data && query?.data.length} title="Links">
      <LinksManager links={query?.data} />
    </EntityPage>
  );
}

export default Links;
