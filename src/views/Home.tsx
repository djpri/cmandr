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
import { apiConfig } from "auth/auth";
import { FaExternalLinkSquareAlt } from "react-icons/fa";
import { RiCommandLine } from "react-icons/ri";
import { Link as RouterLink, useNavigate } from "react-router-dom";

function Home() {
  const { instance, accounts } = useMsal();
  const navigate = useNavigate();

  const loginRedirect = async () => {
    try {
      await instance.loginRedirect({
        scopes: apiConfig.b2cScopes,
      });
      navigate("/dashboard");
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  return (
    <Flex
      height="100vh"
      flexDirection="column"
      alignItems="center"
      background="radial-gradient(circle at top, hsl(256, 37%, 20%) 0%,  hsl(256, 37%, 15%) 50%, #131316 70%)"
      backgroundSize="contain"
      backgroundRepeat="no-repeat"
    >
      <VStack
        mt="50px"
        mb="100px"
        w="100%"
        maxW="container.xl"
        spacing="5"
        rounded="md"
        p="20px"
      >
        <Box px="20px">
          <Heading
            as="h1"
            fontSize="3rem"
            fontWeight="900"
            textShadow="outline"
            color="white"
          >
            Cmandr
          </Heading>
          <HStack my={3}>
            <RiCommandLine size="1.5rem" color="white" />
            <Heading
              as="h2"
              fontSize="1.5rem"
              textShadow="outline"
              color="white"
            >
              Store and manage your command snippets
            </Heading>
          </HStack>
          <HStack>
            <Link
              as={RouterLink}
              to="/dashboard"
              _hover={{ textDecoration: "none" }}
            >
              <Button
                size="md"
                bgColor="#2e89ad"
                color="white"
                variant="solid"
                textShadow="outline"
                isDisabled={accounts[0] === undefined}
                _hover={{
                  bgColor: "blue.600",
                }}
              >
                Open App
              </Button>
            </Link>
            <Button
              className="login-button"
              size="md"
              bgColor="purple.400"
              color="white"
              variant="outline"
              textShadow="outline"
              _hover={{
                bgColor: "purple.300",
                textDecoration: "none",
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
          <HStack my={5}>
            <RiCommandLine size="1.5rem" color="white" />
            <Text fontSize="1rem" color="white">
              Store and manage commands into categories
            </Text>
          </HStack>
          {/* <chakra.img
            src="/command-categories.png"
            alt="command-categories"
            width="min(80vw, 800px)"
          /> */}
        </Box>
        <Box shadow="base" p="20px">
          <HStack my={5}>
            <FaExternalLinkSquareAlt size="1.5rem" color="white" />
            <Text fontSize="1rem" color="white">
              Also features a bookmark manager for documentation, blogs, or
              other sites
            </Text>
          </HStack>
          {/* <chakra.img
            src="/links.png"
            alt="links"
            width="min(80vw, 800px)"
            shadow="lg"
          /> */}
        </Box>
      </Flex>
    </Flex>
  );
}

export default Home;
