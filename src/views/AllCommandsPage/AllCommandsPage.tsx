import { Heading } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import CommandsList from "../../components/CommandsList/CommandsList";
import UserLayout from "../../layout/UserLayout";
import { selectUserUid } from "../../redux/auth/authSlice";
import { getCommandsFromDB } from "../../services/commands/getCommandsFromDB";

function AllCommandsPage() {
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector(selectUserUid);

  useEffect(() => {
    dispatch(getCommandsFromDB());
    console.log(location);
  }, [dispatch, user, location]);

  return (
    <UserLayout>
      <Heading as="h2" mb="30px" fontWeight="900">
        All Commands
      </Heading>
      <CommandsList showCategories />
    </UserLayout>
  );
}

export default AllCommandsPage;
