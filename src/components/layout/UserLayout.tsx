import { AuthenticatedTemplate } from "@azure/msal-react";
import { Box, useMediaQuery } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { selectIsSidebarOpen } from "redux/slices/layoutSlice";
import NavBar from "./NavBar/NavBar";
import SideBar from "./SideBar/SideBar";

/**
 * Layout for logged in users
 * @see https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/getting-started.md#determining-whether-a-user-is-authenticated
 */
function UserLayout({ children }) {
  const [isSmallerThan1280] = useMediaQuery("(max-width: 1280px)");
  const isSidebarOpen = useSelector(selectIsSidebarOpen);

  return (
    <>
      <NavBar />
      <AuthenticatedTemplate>
        <Box display="flex">
          <SideBar />
          <Box
            position="relative"
            w="90%"
            maxW="90%"
            mx={isSidebarOpen && !isSmallerThan1280 ? "15rem" : "auto"}
          >
            <Box
              mt="5rem"
              mx="auto"
              px={!isSmallerThan1280 && "3rem"}
              mb="3rem"
            >
              {children}
            </Box>
          </Box>
        </Box>
      </AuthenticatedTemplate>
    </>
  );
}

export default UserLayout;
