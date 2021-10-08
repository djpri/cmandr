import * as React from "react";
import {
  ChakraProvider,
  Box,
  Container,
  Text,
  VStack,
  Grid,
  Heading,
} from "@chakra-ui/react";
import theme from "./theme/theme";
import AppBar from "./Components/AppBar/AppBar";
import CommandsList from "./Components/CommandsList/CommandsList";
import { useAppDispatch } from "./Redux/store";
import { setAuthListener } from "./Redux/auth/authSlice";
import { BrowserRouter, Route } from "react-router-dom";
import CreateCommand from "./Components/CreateCommand/CreateCommand";

export const App = () => {
  const dispatch = useAppDispatch();

  dispatch(setAuthListener());

  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <AppBar />
        <Container maxW="container.xl" ml="300px" mt="50px" position="relative">
          <Route exact path="/">
            <Box textAlign="center" fontSize="xl">
              <Grid minH="100vh" p={3}>
                <VStack spacing={8}>
                  <Text>Commander</Text>
                </VStack>
              </Grid>
            </Box>
            <CommandsList />
          </Route>
          <Route path="/dashboard">
            <Box exact textAlign="center" fontSize="xl">
              <Grid p={3}>
                <VStack spacing={8}>
                  <Text>Dashboard</Text>
                </VStack>
              </Grid>
            </Box>
          </Route>
          <Route exact path="/manage-commands">
            <CreateCommand />
          </Route>
          <Route path="/commands">
            <Heading as="h2" mb="50px">
              All Commands
            </Heading>
            <CommandsList />
          </Route>
        </Container>
      </BrowserRouter>
    </ChakraProvider>
  );
};
