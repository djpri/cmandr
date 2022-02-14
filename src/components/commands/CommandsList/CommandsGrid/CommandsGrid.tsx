import { Box, Grid, GridItem } from "@chakra-ui/react";
import * as React from "react";
import { useEffect } from "react";
import { Command } from "../../../../models/command";
import Header from "./Header/Header";
import Row from "./Row/Row";

function CommandsTable({ commands, showCategories }) {
  useEffect(() => {
    console.log(commands);
  }, [commands]);

  return (
    <Box p="1" display="flex" flexDirection="column" w="100%">
      <Grid
        variant="unstyled"
        size="md"
        templateColumns={["1fr", null, null, "2fr 2fr 1fr 1fr"]}
        gap={4}
        p="4"
      >
        <Header field="description" label="Description" />
        <Header field="command" label="Command" />
        {showCategories && <Header field="category" label="Category" />}
        <GridItem />
      </Grid>

      <Grid
        w="100%"
        marginX="auto"
        templateColumns={["repeat(auto-fill, 200px)", null, null, "1fr"]}
        gap={[4, null, null, 0]}
      >
        {commands &&
          commands.map((command: Command) => (
            <Row
              commandItem={command}
              key={command.id}
              showCategories={showCategories}
            />
          ))}
      </Grid>
    </Box>
  );
}

export default CommandsTable;
