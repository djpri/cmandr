import { Box, Grid, GridItem } from "@chakra-ui/react";
import { Command, CommandReadDto } from "models/command";
import * as React from "react";
import Header from "./Header/Header";
import Row from "./Row/Row";

interface IProps {
  commands: CommandReadDto[];
  showCategories: boolean;
  sortFunction?: (a: CommandReadDto, b: CommandReadDto) => 1 | -1;
  setSortFunction?: React.Dispatch<
    React.SetStateAction<(a: CommandReadDto, b: CommandReadDto) => 1 | -1>
  >;
}

function CommandsTable({
  commands,
  showCategories,
  sortFunction,
  setSortFunction,
}: IProps) {
  return (
    <Box p="1" display="flex" flexDirection="column" w="100%">
      <Grid
        // size="md"
        templateColumns={["1fr", null, null, "2fr 2fr 1fr 1fr"]}
        gap={4}
        p="4"
      >
        <Header
          sortFunction={sortFunction}
          setSortFunction={setSortFunction}
          label="Description"
          field="description"
        />
        <Header
          sortFunction={sortFunction}
          setSortFunction={setSortFunction}
          label="Command"
          field="line"
        />
        {showCategories && (
          <Header
            sortFunction={sortFunction}
            setSortFunction={setSortFunction}
            label="Category"
            field="category"
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
