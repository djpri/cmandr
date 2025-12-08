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
import Canvas from "components/animations/Canvas";
import LoginButton from "components/auth/LoginButton";
import { PropsWithChildren, useEffect, useState } from "react";
import { FaDesktop, FaExternalLinkSquareAlt } from "react-icons/fa";
import { RiCommandLine } from "react-icons/ri";
import { Link as RouterLink } from "react-router-dom";

function FeatureBox({ children }: PropsWithChildren) {
  const [hue, setHue] = useState(280);
  const [isIncreasing, setIsIncreasing] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setHue((prevHue) => {
        if (prevHue >= 360) {
          setIsIncreasing(false);
        } else if (prevHue <= 280) {
          setIsIncreasing(true);
        }
        return isIncreasing ? prevHue + 1 : prevHue - 1;
      });
    }, 50)

    return () => {
      clearInterval(timer);
    };
  }, [isIncreasing]);
  
  return (
    <Box
      borderColor={
        "hsl(256.2616822429907, 47.98206278026906%, 56.27450980392157%)"
      }
      bgColor={"hsla(235, 47%, 56%, 0.1)"}
      borderWidth="2px"
      py={4}
      px={8}
      rounded="md"
      filter={`hue-rotate(${hue}deg)`}
    >
      {children}
    </Box>
  );
}

function Home() {
  const { accounts } = useMsal();
  // const navigate = useNavigate();

  return (
    <Box
      display="fixed"
      top="0"
      minH="100vh"
      backgroundSize="contain"
      backgroundRepeat="no-repeat"
      bgColor="hsl(256, 37%, 15%)"
      background="radial-gradient(circle at top, hsl(256, 37%, 20%) 0%,  hsl(256, 37%, 15%) 50%, #131316 70%)"
    >
      <Flex
        minH="100vh"
        width="80vw"
        m={"auto"}
        flexDirection={["column", null, null, "row"]}
        justifyContent="space-between"
        alignItems="center"
              mb={8}
      >
        <VStack
          mt="50px"
          mb="100px"
          maxW="container.xl"
          spacing="5"
          rounded="md"
          p="20px"
          flexGrow={1}
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
                Store and manage your command snippets, and more
              </Heading>
            </HStack>
            <Canvas />
            <HStack>
              <Link
                as={RouterLink}
                to="/dashboard"
                _hover={{ textDecoration: "none" }}
              >
                <Button
                  size="md"
                  bgColor="#00909d"
                  color="white"
                  variant="solid"
                  textShadow="outline"
                  _hover={{
                    bgColor: "blue.600",
                  }}
                  isDisabled={accounts[0] === undefined}
                >
                  Open App
                </Button>
              </Link>
              {/* <Button
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
                navigate("/login");
              }}
              isDisabled={accounts[0] !== undefined}
            >
              Log In / Sign Up
            </Button> */}
              <LoginButton />
            </HStack>
          </Box>
        </VStack>
        <Flex gap={6} direction="column" fontSize="lg" flexGrow={4}>
          <FeatureBox>
            <HStack my={5}>
              <RiCommandLine size="1.5rem" color="white" />
              <Text color="white">
                Organise your commands into lists and folders
              </Text>
            </HStack>
            {/* <UnorderedList spacing={3} styleType="square" fontSize="md" px={4}>
              <ListItem>Drag and drop to organise your folders</ListItem>
              <ListItem>Sort folders, either alphabetically or by item count, using the dashboard</ListItem>
            </UnorderedList> */}
            {/* <chakra.img
            src="/command-categories.png"
            alt="command-categories"
            width="min(80vw, 800px)"
          /> */}
          </FeatureBox>
          <FeatureBox>
            <HStack my={5}>
              <FaExternalLinkSquareAlt size="1.5rem" color="white" />
              <Text color="white">
                Use the built-in bookmark manager for storing documentation,
                blogs, or other sites
              </Text>
            </HStack>
            {/* <chakra.img
            src="/links.png"
            alt="links"
            width="min(80vw, 800px)"
            shadow="lg"
          /> */}
          </FeatureBox>
          <FeatureBox>
            <HStack my={5}>
              <FaDesktop size="1.5rem" color="white" />
              <Text color="white">Store code snippets, and edit using the online code editor</Text>
            </HStack>
            {/* <chakra.img
            src="/links.png"
            alt="links"
            width="min(80vw, 800px)"
            shadow="lg"
          /> */}
          </FeatureBox>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Home;
