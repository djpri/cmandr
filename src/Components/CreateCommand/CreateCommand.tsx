import * as React from "react";
import {
  Box,
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

function CreateCommand() {
  return (
    <>
      <Box>boo</Box>
      <Container maxW="container.xl">
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
                <Button colorScheme="whatsapp">
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
