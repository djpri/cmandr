import * as React from "react";
import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  Grid,
  theme,
} from "@chakra-ui/react";
import AppBar from "./Components/AppBar/AppBar";
import CommandsList from "./Components/CommandsList/CommandsList";

export const App = () => (
  <ChakraProvider theme={theme}>
    <AppBar />
    <CommandsList />
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <VStack spacing={8}>
          <Text>Commander</Text>
        </VStack>
      </Grid>
    </Box>
  </ChakraProvider>
);
