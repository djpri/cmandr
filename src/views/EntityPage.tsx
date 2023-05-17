import { Heading, Stack, Text } from "@chakra-ui/react";
import UserLayout from "components/layout/UserLayout";
import { pluralizeNumItems } from "helpers/pluralize";
import { PropsWithChildren } from "react";

interface EntityPageProps {
  numItems: number;
  title: string;
  singleCategory?: boolean;
  headerOptions?: JSX.Element;
}

// TODO: Add link to parent group if a parent group exists

function EntityPage({
  children,
  numItems,
  title,
  headerOptions,
}: PropsWithChildren<EntityPageProps>) {
  return (
    <UserLayout>
      <Stack mb="5px" display="flex" alignItems="center" direction="row">
        <Heading as="h2" fontWeight="900" fontSize="3xl">
          {title}
        </Heading>
        {headerOptions}
      </Stack>

      <Text mb="30px" color="gray.500" fontWeight="700">
        {pluralizeNumItems(numItems)}
      </Text>

      {children}
    </UserLayout>
  );
}

export default EntityPage;
