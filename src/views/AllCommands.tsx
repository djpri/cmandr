import { Button, Heading } from "@chakra-ui/react";
import useCommands from "hooks/commands/useCommands";
import CommandsManager from "../components/commands/CommandsManager/CommandsManager";
import UserLayout from "../components/layout/UserLayout";

function AllCommandsPage() {
  const { data } = useCommands();

  return (
    <UserLayout>
      <Heading as="h2" mb="30px" fontWeight="900">
        All Commands
      </Heading>
      {data?.commands && <CommandsManager commands={data.commands} />}
    </UserLayout>
  );
}

export default AllCommandsPage;
