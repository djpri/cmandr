import * as React from "react";
import NavBar from "./NavBar/NavBar";
import SideBar from "../layout/SideBar/SideBar";
import { Container } from "@chakra-ui/layout";
import { selectIsSidebarOpen } from "../redux/layout/layoutSlice";
import { useSelector } from "react-redux";

function UserLayout({ children }) {
  const isSidebarOpen = useSelector(selectIsSidebarOpen);

  // useEffect(() => {
  //   console.log(isLoggedIn);
  //   if (!isLoggedIn) history.push("/account/login");
  // }, [isLoggedIn, history]);

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
