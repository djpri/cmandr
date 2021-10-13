import * as React from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { ICommand } from "../../types/types";
import {
  Code,
  Link,
  Button,
  Box,
  HStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Popover,
  PopoverTrigger,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  Collapse,
  useDisclosure,
} from "@chakra-ui/react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useSelector, useDispatch } from "react-redux";
import { selectUserUid } from "../../redux/auth/authSlice";
import { GoLinkExternal } from "react-icons/go";
import { IoMdOptions } from "react-icons/io";
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";
import DeleteCommandButton from "../shared/DeleteCommandButton/DeleteCommandButton";
import AddCommandForm from "../shared/AddCommandForm/AddCommandForm";
import {
  getCommandsFromDB,
  selectAllCommands,
} from "../../redux/commands/commandsSlice";

function CommandManager() {
  const dispatch = useDispatch();
  const user = useSelector(selectUserUid);
  const reduxCommands = useSelector(selectAllCommands);
  // const [commands, setCommands] = React.useState<ICommand[]>([]);
  const [isCopied, setIsCopied] = React.useState({});
  const { isOpen, onToggle } = useDisclosure();

  // Fill command data if there is a user logged in
  React.useEffect(() => {
    dispatch(getCommandsFromDB());
  }, [user, dispatch]);

  const handleCopy = (index: number) => {
    setIsCopied((prevState) => ({ [index]: true }));
    setTimeout(() => {
      setIsCopied((prevState) => ({}));
    }, 1500);
  };

  if (reduxCommands.length === 0)
    return (
      <Box maxW="container.lg" boxShadow="base" rounded="md" p="5">
        not logged in
      </Box>
    );

  return (
    <>
      <Box maxW="container.xl" boxShadow="base" rounded="md" p="5">
        {isOpen ? (
          <Button onClick={onToggle} mb="4">
            {<AiFillCaretUp />}
          </Button>
        ) : (
          <Button onClick={onToggle} mb="4" rightIcon={<AiFillCaretDown />}>
            Add
          </Button>
        )}
        <Collapse in={isOpen} animateOpacity>
          <AddCommandForm />
        </Collapse>
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
                      <Popover isLazy placement="right">
                        <PopoverTrigger>
                          <Button size="xs" bgColor="teal.500" color="white">
                            <IoMdOptions />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                          <PopoverHeader fontWeight="semibold">
                            Options
                          </PopoverHeader>
                          <PopoverArrow />
                          <PopoverCloseButton />
                          <PopoverBody>
                            <HStack>
                              <Button
                                size="xs"
                                bgColor="green.500"
                                color="white"
                              >
                                Edit
                              </Button>
                              <DeleteCommandButton commandId={id} />
                            </HStack>
                          </PopoverBody>
                        </PopoverContent>
                      </Popover>
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
