import { AuthenticatedTemplate } from "@azure/msal-react";
import { Container } from "@chakra-ui/layout";
import { useSelector } from "react-redux";
import { selectIsSidebarOpen } from "redux/slices/layoutSlice";
import NavBar from "./NavBar/NavBar";
import SideBar from "./SideBar/SideBar";

/**
 * Layout for logged in users
 * @see https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/getting-started.md#determining-whether-a-user-is-authenticated
 */
function UserLayout({ children }) {
  const isSidebarOpen = useSelector(selectIsSidebarOpen);

  return (
    <>
      <NavBar />
      <SideBar />
      <AuthenticatedTemplate>
        <Container
          mt="80px"
          mb="50px"
          position="relative"
          maxW="container.xl"
          w="100%"
        >
          {children}
        </Container>
      </AuthenticatedTemplate>
    </>
  );
}

export default UserLayout;
