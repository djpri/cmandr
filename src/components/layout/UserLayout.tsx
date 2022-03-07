import { useIsAuthenticated } from "@azure/msal-react";
import { Container } from "@chakra-ui/layout";
import * as React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { selectIsSidebarOpen } from "redux/layout/layoutSlice";
import NavBar from "./NavBar/NavBar";
import SideBar from "./SideBar/SideBar";

function UserLayout({ children }) {
  const isSidebarOpen = useSelector(selectIsSidebarOpen);
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    console.log(`Is authenticated? ${isAuthenticated}`);
  }, [isAuthenticated]);

  // useEffect(() => {
  //   if (!isLoggedIn) navigate("/account/login", { state: { from: location } });
  // }, [isLoggedIn, navigate, location]);

  return (
    <React.Fragment>
      <NavBar />
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
    </React.Fragment>
  );
}

export default UserLayout;
