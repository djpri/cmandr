import { Heading, Text } from "@chakra-ui/react";
import useCommands from "hooks/commands/useCommands";
import CommandsManager from "../components/commands/CommandsManager/CommandsManager";
import UserLayout from "../components/layout/UserLayout";

function AllCommandsPage() {
  const { data } = useCommands();

  return (
    <UserLayout>
      <Heading as="h2" mb="5px" fontWeight="900">
        All Commands
      </Heading>

      <Text mb="30px" color="gray.500" fontWeight="700">
        {data && data.length} items
      </Text>

      <CommandsManager commands={data} />
    </UserLayout>
  );
}

export default AllCommandsPage;
