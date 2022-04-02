import { Heading, Text } from "@chakra-ui/react";
import useCommands from "hooks/commands/useCommands";
import { useMemo } from "react";
import CommandsManager from "../components/commands/CommandsManager/CommandsManager";
import UserLayout from "../components/layout/UserLayout";

function AllCommandsPage() {
  const { data } = useCommands();

  const allCommands = useMemo(() => {
    const array = [];
    data?.pages.forEach((page) => {
      array.push(page.commands);
    });
    console.log(array);
    return array.flat();
  }, [data]);

  return (
    <UserLayout>
      <Heading as="h2" mb="5px" fontWeight="900">
        All Commands
      </Heading>

      <Text mb="30px" color="gray.500" fontWeight="700">
        {data?.pages[0] && data?.pages[0].totalItems} items
      </Text>

      <CommandsManager commands={allCommands} />
    </UserLayout>
  );
}

export default AllCommandsPage;
