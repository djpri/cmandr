import * as React from "react";
import { ChakraProvider, Box, Text, VStack, Grid } from "@chakra-ui/react";
import theme from "./theme/theme";
import AppBar from "./Components/AppBar/AppBar";
import CommandManager from "./Components/CommandsList/CommandsList";
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
        <Route path="/bob">
          <CommandManager />
          <Box textAlign="center" fontSize="xl">
            <Grid minH="100vh" p={3}>
              <VStack spacing={8}>
                <Text>Commander</Text>
              </VStack>
            </Grid>
          </Box>
        </Route>
        <Route path="/dashboard">
          <CommandManager />
          <Box textAlign="center" fontSize="xl">
            <Grid minH="100vh" p={3}>
              <VStack spacing={8}>
                <Text>Dashboard</Text>
              </VStack>
            </Grid>
          </Box>
        </Route>
        <Route path="/manage-commands">
          <CreateCommand />
        </Route>
      </BrowserRouter>
    </ChakraProvider>
  );
};
