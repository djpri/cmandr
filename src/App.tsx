import * as React from "react";
import {
  CSSReset,
  ChakraProvider,
  Box,
  Container,
  Text,
  VStack,
  Grid,
  Heading,
} from "@chakra-ui/react";
import theme from "./theme/theme";
import AppBar from "./components/AppBar/AppBar";
import CommandsList from "./components/CommandsList/CommandsList";
import { useAppDispatch } from "./redux/store";
import { setAuthListener } from "./redux/auth/authSlice";
import { BrowserRouter, Route } from "react-router-dom";
import CreateCommand from "./components/CreateCommand/CreateCommand";

export const App = () => {
  const dispatch = useAppDispatch();

  dispatch(setAuthListener());

  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
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
            <Box textAlign="center" fontSize="xl">
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
