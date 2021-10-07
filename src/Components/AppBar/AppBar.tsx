/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  useColorModeValue,
  Box,
  Stack,
  Text,
  StackItem,
  StackDivider,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import * as React from "react";

import LoginDrawer from "../LoginDrawer/LoginDrawer";

function AppBar() {
  const gradient = useColorModeValue(
    "linear(to-b, gray.100 0%, gray.200 10%, gray.50 90%, gray.50 100%)",
    "linear(to-b, blue.800 0%, blue.700 10%, blue.800 90%, blue.800 100%)"
  );

  return (
    <Box
      p="0"
      h="100vh"
      position="fixed"
      bgGradient={gradient}
      w="250px"
      borderRight="1px"
      borderColor="gray.500"
    >
      <Box p="5">
        <LoginDrawer />
      </Box>
      <Stack mt="10">
        <Heading as="h3" pl="5">
          Menu
        </Heading>
        <Text p="5">Categories</Text>
        <StackItem>
          <Accordion defaultIndex={[0]} allowMultiple w="100%">
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    Section 1 title
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    Section 2 title
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </StackItem>
      </Stack>
    </Box>
  );
}

export default AppBar;
