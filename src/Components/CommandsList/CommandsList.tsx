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
} from "@chakra-ui/react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useSelector } from "react-redux";
import { selectUserUid } from "../../redux/auth/authSlice";

function CommandManager() {
  const user = useSelector(selectUserUid);
  const [commands, setCommands] = React.useState<ICommand[]>([]);
  const [isCopied, setIsCopied] = React.useState({});

  // Fill command data if there is a user logged in
  React.useEffect(() => {
    const addData = async () => {
      const docSnap: any = await getDocs(
        collection(db, `users/${user}/commands`)
      );
      const commands = docSnap.docs.map((doc) => {
        let docInfo = doc.data();
        docInfo.id = doc.id;
        return docInfo;
      });
      console.log(commands);
      setCommands(commands);
    };
    if (user) {
      addData();
    } else {
      setCommands([]);
    }
  }, [user]);

  const handleCopy = (index: number) => {
    setIsCopied((prevState) => ({ [index]: true }));
    setTimeout(() => {
      setIsCopied((prevState) => ({}));
    }, 1500);
  };

  if (commands.length === 0)
    return (
      <Box maxW="container.lg" boxShadow="base" rounded="md" p="5">
        not logged in
      </Box>
    );

  return (
    <>
      <Box maxW="container.xl" boxShadow="base" rounded="md" p="5">
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
            {commands.map(
              ({ id, howTo, command, reference, category }, index) => (
                <Tr key={index}>
                  <Td>{howTo}</Td>
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
                  <Td>{category}</Td>
                  <Td>
                    <HStack spacing="4">
                      <CopyToClipboard
                        text={command}
                        onCopy={() => handleCopy(index)}
                      >
                        <Button
                          size="xs"
                          bgColor={
                            isCopied[index] ? "purple.400" : "purple.500"
                          }
                          color="white"
                          w="70px"
                        >
                          {isCopied[index] ? "Copied" : "Copy"}
                        </Button>
                      </CopyToClipboard>
                      <Button size="xs" bgColor="green.500" color="white">
                        <Link target="_blank" rel="noreferrer" href={reference}>
                          Link
                        </Link>
                      </Button>
                      <Popover isLazy placement="right">
                        <PopoverTrigger>
                          <Button size="xs" bgColor="teal.500" color="white">
                            :
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
                              <Button size="xs" bgColor="red.500" color="white">
                                Delete
                              </Button>
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
