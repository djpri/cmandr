import { useMsal } from "@azure/msal-react";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { apiConfig } from "auth/apiConfig";
import { AiFillMacCommand } from "react-icons/ai";
import { FaExternalLinkSquareAlt } from "react-icons/fa";
import { RiCommandLine } from "react-icons/ri";
import { Link as RouterLink } from "react-router-dom";

function Home() {
  const { instance, accounts } = useMsal();

  const loginRedirect = async () => {
    try {
      await instance.loginRedirect({
        scopes: apiConfig.b2cScopes,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  return (
    <Flex height="100vh" flexDirection="column" alignItems="center">
      <VStack
        mt="50px"
        mb="100px"
        w="100%"
        maxW="container.xl"
        spacing="5"
        shadow="base"
        rounded="md"
        p="20px"
      >
        <Box px="20px">
          <Heading
            as="h1"
            fontSize="3rem"
            fontWeight="900"
            textShadow="outline"
          >
            Cmandr
          </Heading>
          <HStack my={2}>
            <RiCommandLine size="1.5rem" />
            <Heading as="h2" fontSize="1.5rem" textShadow="outline" mb="30px">
              Store and manage your command snippets
            </Heading>
          </HStack>
          <HStack>
            <Link as={RouterLink} to="/dashboard">
              <Button
                size="md"
                bgColor="blue.800"
                color="white"
                variant="solid"
                textShadow="outline"
                textDecoration="cyan"
                isDisabled={accounts[0] === undefined}
                _hover={{
                  bgColor: "blue.600",
                }}
              >
                Open App
              </Button>
            </Link>
            <Button
              size="md"
              bgColor="yellow.400"
              color="white"
              variant="outline"
              textShadow="outline"
              textDecoration="cyan"
              _hover={{
                bgColor: "yellow.300",
              }}
              onClick={() => {
                loginRedirect();
              }}
              isDisabled={accounts[0] !== undefined}
            >
              Log In / Sign Up
            </Button>
          </HStack>
        </Box>
      </VStack>
      <Flex gap={6} direction="column">
        <Box shadow="base" p="20px">
          <HStack>
            <RiCommandLine size="1.5rem" />
            <Text fontSize="1rem">
              Store and manage commands into categories
            </Text>
          </HStack>
        </Box>
        <Box shadow="base" p="20px">
          <HStack>
            <FaExternalLinkSquareAlt size="1.5rem" />
            <Text fontSize="1rem">
              Also features a bookmark manager for documentation, blogs, or
              other sites
            </Text>
          </HStack>
        </Box>
      </Flex>
    </Flex>
  );
}

export default Home;
