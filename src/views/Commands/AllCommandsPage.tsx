import { Heading } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import CommandsList from "../../components/commands/CommandsList/CommandsList";
import UserLayout from "../../layout/UserLayout";
import { getCommandsFromDB } from "../../services/commands/getCommandsFromDB";

function AllCommandsPage() {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCommandsFromDB());
  }, [dispatch, location]);

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
