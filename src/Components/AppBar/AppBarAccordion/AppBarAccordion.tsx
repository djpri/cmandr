import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import * as React from "react";
import { Link as RouterLink } from "react-router-dom";

function AppBarAccordion() {
  return (
    <Accordion defaultIndex={[0]} allowMultiple w="100%">
      <AccordionItem>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            <Text fontWeight="700" letterSpacing="1px">
              Menu
            </Text>
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel pb={4}>
          <Stack>
            <Link as={RouterLink} to="/dashboard">
              Dashboard
            </Link>
            <Link as={RouterLink} to="/manage-commands">
              Command manager
            </Link>
            <Link as={RouterLink} to="/manage-commands">
              Settings
            </Link>
          </Stack>
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            <Text fontWeight="700" letterSpacing="1px">
              Categories
            </Text>
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel pb={4}>
          <Stack>
            <Link as={RouterLink} to="commands">
              <Text>All commands</Text>
            </Link>
            <Text>General</Text>
            <Text>Git</Text>
            <Text>npm</Text>
            <Text>yarn</Text>
            <Text>baba</Text>
          </Stack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

export default AppBarAccordion;
