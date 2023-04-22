import { AuthenticatedTemplate } from "@azure/msal-react";
import { Box, useMediaQuery } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { useSelector } from "react-redux";
import { selectIsSidebarOpen } from "redux/slices/layoutSlice";
import NavBar from "./NavBar/NavBar";
import SideBar from "./SideBar/SideBar";

/**
 * Layout for logged-in users
 * @see https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/getting-started.md#determining-whether-a-user-is-authenticated
 */
function UserLayout({ children }: PropsWithChildren) {
  const [isSmallerThan1280] = useMediaQuery("(max-width: 1280px)");
  const isSidebarOpen = useSelector(selectIsSidebarOpen);

  return (
    <>
      <NavBar />
      <AuthenticatedTemplate>
        <Box display="flex" className="userLayout" height="100vh">
          <SideBar />
          <Box
            position="relative"
            w={isSmallerThan1280 ? "90%" : "100%"}
            // maxW="90%"
            ml={isSidebarOpen && !isSmallerThan1280 ? "15rem" : "auto"}
            className="userLayout-content"
            flex={1}
            px={isSmallerThan1280 ? "2.5vw" : "0"}
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
