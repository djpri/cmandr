import * as React from "react";
import NavBar from "./NavBar/NavBar";
import SideBar from "../layout/SideBar/SideBar";
import { Container } from "@chakra-ui/layout";
import { selectIsSidebarOpen } from "../redux/layout/layoutSlice";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { selectIsInitialized, selectIsLoggedIn } from "../redux/auth/authSlice";
import { useEffect } from "react";

function UserLayout({ children }) {
  const isSidebarOpen = useSelector(selectIsSidebarOpen);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isInitialized = useSelector(selectIsInitialized);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoggedIn) navigate("/account/login", { state: { from: location } });
  }, [isLoggedIn, navigate, location]);

  if (!isInitialized) return null;

  return (
    <React.Fragment>
      <NavBar />
      <SideBar />
      <Container
        w={isSidebarOpen ? "70%" : "97.5%"}
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
