import { Heading } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import CommandsList from "../components/commands/CommandsList/CommandsList";
import UserLayout from "../layout/UserLayout";
import { getCommandsFromDB } from "../services/commands/getCommandsFromDB";
import { Command } from "../types/types";

const ghostCommands = () => {
  const ghostData: Command[] = [];
  for (let i = 0; i < 20; i++) {
    ghostData.push({
      id: i,
      description: "",
      command: "",
      reference: "    ",
      category: {
        id: null,
        name: "",
      },
    });
  }
  return ghostData;
};

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
      <CommandsList showCategories ghostCommands={ghostCommands()} />
    </UserLayout>
  );
}

export default AllCommandsPage;
