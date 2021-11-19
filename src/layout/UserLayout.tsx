import * as React from "react";
import NavBar from "./NavBar/NavBar";
import SideBar from "../layout/SideBar/SideBar";
import { Container } from "@chakra-ui/layout";
import { selectIsSidebarOpen } from "../redux/layout/layoutSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectIsLoggedIn } from "../redux/auth/authSlice";
import { useEffect } from "react";

function UserLayout({ children }) {
  const isSidebarOpen = useSelector(selectIsSidebarOpen);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) navigate("/account/login");
  }, [isLoggedIn, navigate]);

  return (
    <React.Fragment>
      <NavBar />
      <SideBar />
      <Container
        maxW="container.xl"
        maxH="80vh"
        mt="30px"
        mb="50px"
        ml={isSidebarOpen ? "auto" : "2vw"}
        position="relative"
      >
        {children}
      </Container>
    </React.Fragment>
  );
}

export default UserLayout;
