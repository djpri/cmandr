import useLinks from "hooks/links/useLinks";
import EntityPage from "views/EntityPage";
import SnippetsManager from "components/snippets/SnippetsManager/SnippetsManager";

function Links() {
  const { query } = useLinks();

  return (
    <EntityPage numItems={query?.data && query?.data.length} title="Snippets">
      <SnippetsManager links={query.data} />
    </EntityPage>
  );
}

export default Links;
