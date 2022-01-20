import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import * as React from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import CreateCommand from "./components/commands/CreateCommand/CreateCommand";
import { selectUserUid, setAuthListener } from "./redux/auth/authSlice";
import { useAppDispatch } from "./redux/store";
import { getCommandCategoriesFromDB } from "./services/commandCategories/getCommandCategoriesFromDB";
import { getLinkCategoriesFromDB } from "./services/linkCategories/getLinkCategoriesFromDB";
import theme from "./theme/theme";
import AllCommandsPage from "./views/AllCommands";
import CommandCategoryPage from "./views/CommandCategory";
import HomePage from "./views/Home";
import LinkCategory from "./views/LinkCategory";
import Links from "./views/AllLinks";
import LoginPage from "./views/Login";

export const App = () => {
  const dispatch = useAppDispatch();
  const user = useSelector(selectUserUid);

  // check if user is still logged in from previous session
  // update redux state when current user is logged in or out
  React.useEffect(() => {
    dispatch(setAuthListener());
  }, [dispatch]);

  // fill category data if there is a user logged in, empty when user logs out
  React.useEffect(() => {
    if (user) {
      dispatch(getCommandCategoriesFromDB());
      dispatch(getLinkCategoriesFromDB());
    }
  }, [user, dispatch]);

  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/manage-commands" element={<CreateCommand />} />
        <Route path="/commands" element={<AllCommandsPage />} />
        <Route path="/commands/:id" element={<CommandCategoryPage />} />
        <Route path="/links" element={<Links />} />
        <Route path="/links/:id" element={<LinkCategory />} />
        <Route path="/account/login" element={<LoginPage />} />
      </Routes>
    </ChakraProvider>
  );
};
