import {
  Box,
  Button,
  Code,
  HStack,
  Link,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import * as React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { GoLinkExternal } from "react-icons/go";
import { useSelector } from "react-redux";
import { selectAllCommands } from "../../redux/commands/commandsSlice";
import AddCommandButton from "./AddCommandButton/AddCommandButton";
import CommandOptions from "./CommandOptions/CommandOptions";
import TableHeader from "./TableHeader/TableHeader";

function CommandManager() {
  const allCommands = useSelector(selectAllCommands);
  const [commands, setCommands] = React.useState(allCommands);
  const [isCopied, setIsCopied] = React.useState({});

  React.useEffect(() => {
    setCommands(allCommands);
  }, [allCommands]);

  const handleCopy = (index: number) => {
    setIsCopied({ [index]: true });
    setTimeout(() => {
      setIsCopied({});
    }, 1500);
  };

  const sortCommandsByField = (field, isAscending = true) => {
    setCommands((prevState) => {
      let newState = [...prevState];
      newState.sort((a, b) => {
        let valueA = a[field].toUpperCase();
        let valueB = b[field].toUpperCase();
        if (valueA < valueB) return -1;
        if (valueA > valueB) return 1;
        return 0;
      });
      if (isAscending === false) return newState.reverse();
      return newState;
    });
  };

  if (commands.length === 0)
    return (
      <Box maxW="container.lg" boxShadow="base" rounded="md" p="5">
        no commands available
      </Box>
    );

  return (
    <>
      <Box
        maxW="container.xl"
        overflowX="auto"
        boxShadow="base"
        rounded="md"
        p="5"
      >
        <AddCommandButton />
        <Table>
          <Thead>
            <Tr>
              <TableHeader
                sortCommandsByField={sortCommandsByField}
                field="howTo"
                label="How to..."
              />
              <TableHeader
                sortCommandsByField={sortCommandsByField}
                field="command"
                label="Command"
              />
              <TableHeader
                sortCommandsByField={sortCommandsByField}
                field="category"
                label="Category"
              />
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {commands.map(
              ({ id, howTo, command, reference, category }, index) => (
                <Tr key={index}>
                  {/* HOWTO COLUMN */}
                  <Td>{howTo}</Td>
                  {/* COMMAND COLUMN */}
                  <Td>
                    <Code
                      _hover={{
                        cursor: "pointer",
                        backgroundColor: "gray.200",
                        color: "black",
                      }}
                      onClick={() => handleCopy(index)}
                    >
                      {command}
                    </Code>
                  </Td>
                  {/* CATEGORY COLUMN */}
                  <Td>{category}</Td>
                  <Td>
                    <HStack spacing="4">
                      <CopyToClipboard
                        text={command}
                        onCopy={() => handleCopy(index)}
                      >
                        <Button
                          size="xs"
                          bgColor={isCopied[index] ? "blue.400" : "blue.500"}
                          color="white"
                          w="70px"
                        >
                          {isCopied[index] ? "Copied" : "Copy"}
                        </Button>
                      </CopyToClipboard>
                      {/* BUTTONS */}
                      <Link target="_blank" rel="noreferrer" href={reference}>
                        <Button
                          size="xs"
                          bgColor="cyan.600"
                          color="white"
                          leftIcon={<GoLinkExternal />}
                        >
                          Link
                        </Button>
                      </Link>
                      <CommandOptions
                        commandId={id}
                        command={{ id, howTo, command, reference, category }}
                      />
                    </HStack>
                  </Td>
                </Tr>
              )
            )}
          </Tbody>
        </Table>
      </Box>
    </>
  );
}

export default CommandManager;
