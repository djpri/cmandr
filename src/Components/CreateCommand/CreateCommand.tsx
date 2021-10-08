import * as React from "react";
import {
  Container,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";

import AddCommandForm from "../shared/AddCommandForm/AddCommandForm";

function CreateCommand() {
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
              <AddCommandForm />
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
