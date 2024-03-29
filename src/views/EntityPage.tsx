import { Box, Stack, Text } from "@chakra-ui/react";
import { pluralizeNumItems } from "helpers/pluralize";
import { PropsWithChildren } from "react";

interface EntityPageProps {
  numItems: number;
  singleCategory?: boolean;
  headerOptions: JSX.Element;
}

// TODO: Add link to parent group if a parent group exists
// TODO: Use "Editable" component from Chakra UI to allow users to edit category names
// https://chakra-ui.com/docs/components/editable

function EntityPage({
  children,
  numItems,
  headerOptions,
}: PropsWithChildren<EntityPageProps>) {
  return (
    <>
      <Stack mb="5px" display="flex" alignItems="center" direction="row">
        {/* <Heading as="h2" fontWeight="900" fontSize="2xl">
          {title}
        </Heading> */}
        {headerOptions}
      </Stack>

      <Text mb="30px" color="gray.500" fontWeight="700">
        {pluralizeNumItems(numItems)}
      </Text>

      <Box position="relative">{children}</Box>
    </>
  );
}

export default EntityPage;
