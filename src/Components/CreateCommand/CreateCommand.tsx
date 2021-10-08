import * as React from "react";
import {
  Container,
  Text,
  Stack,
  Input,
  Heading,
  Select,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { selectUserUid } from "../../Redux/auth/authSlice";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

function CreateCommand() {
  const uid: string = useSelector(selectUserUid);
  const [errorMessage, setErrorMessage] = React.useState<string>("");

  const handleAddCommand = async () => {
    try {
      await addDoc(collection(db, `users/${uid}/commands`), {
        howTo: "add react icons package",
        command: "yarn add react-icons",
        reference: "https://react-icons.github.io/react-icons/",
        category: "npm package",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container maxW="container.xl" mt="50px">
        <Heading as="h2" mb="10">
          Command Manager
        </Heading>
        <Tabs isFitted>
          <TabList>
            <Tab>Create new command</Tab>
            <Tab>Update command</Tab>
            <Tab>Delete command</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Stack spacing={3}>
                <Input
                  name="email"
                  id="displayName"
                  placeholder="How to (description of what command does)"
                />
                <Input name="email" id="email" placeholder="Command" />
                <Select placeholder="Category">
                  <option value="option1">Npm package</option>
                  <option value="option2">General</option>
                  <option value="option3">Git</option>
                </Select>
                <Input name="password" id="password" placeholder="Reference" />
                <Button onClick={handleAddCommand}>
                  <Text>baba</Text>
                </Button>
              </Stack>
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
            <TabPanel>
              <p>three!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </>
  );
}

export default CreateCommand;
