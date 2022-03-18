import { Box, Grid, GridItem } from "@chakra-ui/react";
import { LinksSortFunction } from "helpers/linksSortFunctions";
import { LinkReadDto } from "models/link";
import Header from "./Header/Header";
import Row from "./Row/Row";

interface IProps {
  links: LinkReadDto[];
  showCategories: boolean;
  isLoading: boolean;
  sortFunction?: (a: LinkReadDto, b: LinkReadDto) => 1 | -1;
  setSortFunction?: React.Dispatch<React.SetStateAction<LinksSortFunction>>;
}

function LinksTable({
  links,
  showCategories,
  isLoading,
  sortFunction,
  setSortFunction,
}: IProps) {
  return (
    <Box p="1" display="flex" flexDirection="column" w="100%">
      <Grid
        templateColumns={["1fr", null, null, "2fr 2fr 1fr 1fr"]}
        gap={4}
        p="4"
      >
        <Header
          sortFunction={sortFunction}
          setSortFunction={setSortFunction}
          field="title"
          label="Title"
        />
        <Header
          sortFunction={sortFunction}
          setSortFunction={setSortFunction}
          field="url"
          label="Url"
        />
        {showCategories && (
          <Header
            sortFunction={sortFunction}
            setSortFunction={setSortFunction}
            field="category"
            label="Category"
          />
        )}
        <GridItem />
      </Grid>

      <Grid
        w="100%"
        marginX="auto"
        templateColumns={["repeat(auto-fill, 200px)", null, null, "1fr"]}
        gap={[4, null, null, 0]}
      >
        {links &&
          links.map((link: LinkReadDto) => (
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
