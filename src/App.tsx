import {
  Box,
  ChakraProvider,
  Container,
  CSSReset,
  Grid,
  Heading,
  Text,
  useMediaQuery,
  VStack,
} from "@chakra-ui/react";
import * as React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import AppBar from "./components/AppBar/AppBar";
import CommandsList from "./components/CommandsList/CommandsList";
import CreateCommand from "./components/CreateCommand/CreateCommand";
import NavBar from "./components/NavBar/NavBar";
import { selectUserUid, setAuthListener } from "./redux/auth/authSlice";
import { getCommandsFromDB } from "./redux/commands/commandsSlice";
import {
  selectIsSidebarOpen,
  setSidebarClosed,
} from "./redux/layout/layoutSlice";
import { useAppDispatch } from "./redux/store";
import theme from "./theme/theme";

export const App = () => {
  const dispatch = useAppDispatch();
  const user = useSelector(selectUserUid);
  const isSidebarOpen = useSelector(selectIsSidebarOpen);
  const [isSmallerThan1280] = useMediaQuery("(max-width: 1280px)");

  // check if user is still logged in from previous session
  // update redux state when current user is logged in or out
  React.useEffect(() => {
    dispatch(setAuthListener());
  }, [dispatch]);

  // fill command data if there is a user logged in, empty when user logs out
  React.useEffect(() => {
    dispatch(getCommandsFromDB());
  }, [user, dispatch]);

  // sidebar is initially closed on smaller devices
  React.useEffect(() => {
    if (isSmallerThan1280) dispatch(setSidebarClosed());
  }, [isSmallerThan1280, dispatch]);

  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <BrowserRouter>
        <NavBar />
        <AppBar />
        <Container
          maxW="container.xl"
          mt="30px"
          mb="50px"
          ml={isSidebarOpen ? "auto" : "2vw"}
          position="relative"
        >
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
          <Route exact path="/commands">
            <Heading as="h2" mb="30px" fontWeight="900">
              All Commands
            </Heading>
            {/* <CommandsList /> */}
          </Route>
          <Route exact path="/commands/:id">
            <Heading as="h2" mb="30px" fontWeight="900">
              id
            </Heading>
            <CommandsList />
          </Route>
        </Container>
      </BrowserRouter>
    </ChakraProvider>
  );
};
