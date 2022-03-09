import { AuthenticatedTemplate } from "@azure/msal-react";
import { Container } from "@chakra-ui/layout";
import * as React from "react";
import { useSelector } from "react-redux";
import { selectIsSidebarOpen } from "redux/layout/layoutSlice";
import NavBar from "./NavBar/NavBar";
import SideBar from "./SideBar/SideBar";

// https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/getting-started.md#determining-whether-a-user-is-authenticated

function UserLayout({ children }) {
  const isSidebarOpen = useSelector(selectIsSidebarOpen);
  //const navigate = useNavigate();
  //const location = useLocation();

  // useEffect(() => {
  //   if (!isLoggedIn) navigate("/account/login", { state: { from: location } });
  // }, [isLoggedIn, navigate, location]);

  return (
    <>
      <NavBar />
      <AuthenticatedTemplate>
        <SideBar />
        <Container
          maxW={isSidebarOpen ? "70%" : "97.5%"}
          maxH="80vh"
          mt="80px"
          mb="50px"
          ml={isSidebarOpen ? "300px" : "2.5%"}
          position="relative"
        >
          {children}
        </Container>
      </AuthenticatedTemplate>
    </>
  );
}

export default UserLayout;
