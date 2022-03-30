import { useMsal } from "@azure/msal-react";
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { apiConfig } from "auth/apiConfig";
import { Link as RouterLink } from "react-router-dom";

const gradient = "linear-gradient(-90deg,#171923,#1c1f31,#171923)";

function Home() {
  const { instance } = useMsal();

  const loginRedirect = async () => {
    try {
      await instance.loginRedirect({
        scopes: apiConfig.b2cScopes,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Flex height="100vh" flexDirection="column" alignItems="center">
      <VStack
        mt="50px"
        mb="100px"
        w="100%"
        spacing="5"
        shadow="base"
        rounded="md"
        p="20px"
        bgGradient={gradient}
      >
        <Box px="20px">
          <Heading
            as="h1"
            fontSize="5rem"
            fontWeight="900"
            textShadow="outline"
          >
            Cmandr
          </Heading>
          <Heading as="h2" fontSize="3rem" textShadow="outline" mb="30px">
            🔧 Store and manage your command snippets
          </Heading>
          <HStack>
            <Link as={RouterLink} to="/dashboard">
              <Button
                size="lg"
                bgColor="blue.800"
                color="white"
                variant="solid"
                textShadow="outline"
                textDecoration="cyan"
                _hover={{
                  bgColor: "blue.600",
                }}
              >
                Open App
              </Button>
            </Link>
            <Button
              size="lg"
              bgGradient={gradient}
              color="white"
              variant="outline"
              textShadow="outline"
              textDecoration="cyan"
              _hover={{
                bgGradient: "linear-gradient(-90deg,#2b2e41,#2f3453,#343950)",
              }}
              onClick={() => {
                loginRedirect();
              }}
              isDisabled={instance.getAllAccounts() !== null}
            >
              Log In / Sign Up
            </Button>
          </HStack>
        </Box>
      </VStack>
      <Grid
        maxW="container.xl"
        w="95%"
        templateColumns="repeat(auto-fit, minmax(400px, 1fr))"
        gap={6}
      >
        <GridItem
          shadow=" rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px"
          textAlign="center"
          p="20px"
        >
          <Text fontSize="1.3rem">
            ⌨ Store and manage commands into categories
          </Text>
        </GridItem>
        <GridItem
          shadow=" rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px"
          textAlign="center"
          p="20px"
        >
          <Text fontSize="1.3rem">
            🔗 Also features a bookmark manager for documentation, blogs, or
            other sites
          </Text>
        </GridItem>
      </Grid>
    </Flex>
  );
}

export default Home;
