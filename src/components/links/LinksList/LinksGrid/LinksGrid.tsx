import { Box, Grid, GridItem } from "@chakra-ui/react";
import * as React from "react";
import { Link } from "../../../../types/types";
import Header from "./Header/Header";
import Row from "./Row/Row";

interface IProps {
  links: Link[];
  showCategories: boolean;
  isLoading: boolean;
}

function LinksTable({ links, showCategories, isLoading }: IProps) {
  return (
    <Box p="1" display="flex" flexDirection="column" w="100%">
      <Grid
        variant="unstyled"
        size="md"
        templateColumns={["1fr", null, null, "2fr 2fr 1fr 1fr"]}
        gap={4}
        p="4"
      >
        <Header field="title" label="Title" />
        <Header field="link" label="Url" />
        {showCategories && <Header field="category" label="Category" />}
        <GridItem />
      </Grid>

      <Grid
        w="100%"
        marginX="auto"
        templateColumns={["repeat(auto-fill, 200px)", null, null, "1fr"]}
        gap={[4, null, null, 0]}
      >
        {links.map((link: Link) => (
          <Row
            isLoading={isLoading}
            linkItem={link}
            key={link.id}
            showCategories={showCategories}
          />
        ))}
      </Grid>
    </Box>
  );
}

export default LinksTable;
