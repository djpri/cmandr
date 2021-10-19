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
import { slugify } from "../../../utils/slugify";

function AppBarAccordion() {
  return (
    <Accordion defaultIndex={[0]} allowMultiple w="100%">
      {/* MENU */}
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

      {/* COMMANDS */}
      <AccordionItem>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            <Text fontWeight="700" letterSpacing="1px">
              Commands
            </Text>
          </Box>
          <AccordionIcon />
        </AccordionButton>

        <AccordionPanel pb={4}>
          <Stack>
            <Link as={RouterLink} to="/commands">
              <Text>All commands</Text>
            </Link>
            {["general", "git", "npm package"].map((item, index) => (
              <React.Fragment key="index">
                <Link as={RouterLink} to={`/commands/${slugify(item)}`}>
                  {item}
                </Link>
              </React.Fragment>
            ))}
          </Stack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

export default AppBarAccordion;
