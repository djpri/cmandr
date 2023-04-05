import SnippetsManager from "components/snippets/SnippetsManager/SnippetsManager";
import useSnippets from "hooks/snippets/useSnippets";
import EntityPage from "views/EntityPage";

function AllSnippets() {
  const { query } = useSnippets();

  return (
    <EntityPage numItems={query?.data && query?.data.length} title="Snippets">
      <SnippetsManager snippets={query.data} />
    </EntityPage>
  );
}

export default AllSnippets;
