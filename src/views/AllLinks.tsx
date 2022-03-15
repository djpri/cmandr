import { Heading, Stack } from "@chakra-ui/layout";
import useLinks from "hooks/useLinks";
import UserLayout from "../components/layout/UserLayout";
import LinksList from "../components/links/LinksList/LinksList";

function Links() {
  const { query } = useLinks();

  return (
    <UserLayout>
      <Heading as="h2" mb="30px" fontWeight="900">
        All Links
      </Heading>
      <Stack w="100%">
        {query.data && <LinksList showCategories links={query.data} />}
      </Stack>
    </UserLayout>
  );
}

export default Links;
