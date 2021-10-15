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
  useDisclosure,
} from "@chakra-ui/react";
import * as React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { GoLinkExternal } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { selectUserUid } from "../../redux/auth/authSlice";
import {
  getCommandsFromDB,
  selectAllCommands,
} from "../../redux/commands/commandsSlice";
import AddCommandButton from "./AddCommandButton/AddCommandButton";
import CommandOptions from "./CommandOptions/CommandOptions";

function CommandManager() {
  const dispatch = useDispatch();
  const user = useSelector(selectUserUid);
  const reduxCommands = useSelector(selectAllCommands);
  const [isCopied, setIsCopied] = React.useState({});
  const { isOpen, onToggle } = useDisclosure();
  const ref = React.useRef<HTMLDivElement>(null);

  const handleCopy = (index: number) => {
    setIsCopied({ [index]: true });
    setTimeout(() => {
      setIsCopied({});
    }, 1500);
  };

  if (reduxCommands.length === 0)
    return (
      <Box maxW="container.lg" boxShadow="base" rounded="md" p="5">
        no commands available
      </Box>
    );

  return (
    <>
      <Box maxW="container.xl" boxShadow="base" rounded="md" p="5">
        <AddCommandButton />
        <Box ref={ref} bg="yellow.500">
          <div>Container: Hey,</div>
        </Box>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>How to...</Th>
              <Th>Command</Th>
              <Th>Category</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {reduxCommands.map(
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
                        editRef={ref}
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
