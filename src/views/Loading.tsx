import { Center, HStack, Spinner, Text } from "@chakra-ui/react";

function Loading() {
  return (
    <Center
      h="100vh"
      w="100vw"
      background="radial-gradient(circle at top, hsl(256, 37%, 20%) 0%,  hsl(256, 37%, 15%) 50%, #131316 70%)"
      backgroundSize="contain"
      backgroundRepeat="no-repeat"
    >
      <HStack>
        <Text fontSize="3xl">Loading...</Text>
        <Spinner size="lg" />
      </HStack>
    </Center>
  );
}

export default Loading;
