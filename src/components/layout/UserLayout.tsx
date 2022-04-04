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
          maxW={isSidebarOpen ? "70%" : "97.5%"}
          mt="80px"
          mb="50px"
          ml={isSidebarOpen ? "350px" : "2.5%"}
          position="relative"
        >
          {children}
        </Container>
      </AuthenticatedTemplate>
    </>
  );
}

export default UserLayout;
