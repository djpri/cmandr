import { Heading } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import CommandsList from "../components/commands/CommandsList/CommandsList";
import UserLayout from "../layout/UserLayout";
import { getCommandsFromDB } from "../data/commands/getCommandsFromDB";
import { Command } from "../models/models";

function AllCommandsPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCommandsFromDB());
  }, [dispatch]);

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
