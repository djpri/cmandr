import { useMsal } from "@azure/msal-react";
import { Box, useMediaQuery } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { PropsWithChildren, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setEndOfUserSession, setUserSession } from "redux/slices/appSlice";
import {
  selectIsSidebarOpen,
  selectSidebarSize,
  setSidebarClosed,
  setSidebarOpen,
} from "redux/slices/layoutSlice";
import { useAppDispatch } from "redux/store";
import NavBar from "./NavBar/NavBar";
import SideBar from "./SideBar/SideBar";

/**
 * Layout for logged-in users
 * @see https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/getting-started.md#determining-whether-a-user-is-authenticated
 */
function UserLayout({ children }: PropsWithChildren) {
  const [isSmallerThan1280] = useMediaQuery("(max-width: 1280px)");
  const isSidebarOpen = useSelector(selectIsSidebarOpen);
  const sidebarWidth = useSelector(selectSidebarSize);

  const { accounts } = useMsal();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  // sidebar is initially closed on smaller devices
  useEffect(() => {
    if (isSmallerThan1280) {
      dispatch(setSidebarClosed());
    } else {
      dispatch(setSidebarOpen());
    }
  }, [isSmallerThan1280, dispatch]);

  useEffect(() => {
    if (!accounts[0]) {
      dispatch(setUserSession());
      queryClient.clear();
      navigate("/login");
    } else {
      dispatch(setEndOfUserSession());
    }
  }, []);

  if (!accounts[0]) {
    return null;
  }

  return (
    <>
      <NavBar />
      <Box display="flex" className="userLayout" flexDir="row" w="100%">
        {isSidebarOpen && <SideBar />}
        <Box
          position="relative"
          w={isSmallerThan1280 ? "90%" : "100%"}
          // maxW="90%"
          ml={16}
          pr={4}
          mx={"auto"}
          className="userLayout-content"
          // flex={1}
        >
          <Box
            mt="5rem"
            mx="auto"
            px={!isSmallerThan1280 ? "3rem" : "0.5rem"}
            ml={isSidebarOpen && sidebarWidth}
            mb="3rem"
            transition="all 0.2s ease-in-out"
          >
            {children}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default UserLayout;
