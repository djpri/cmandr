import { Center, Spinner } from "@chakra-ui/react";

function Loading() {
  return (
    <Center
      h="100%"
      w="100%"
      background="radial-gradient(circle at top, hsl(256, 37%, 20%) 0%,  hsl(256, 37%, 15%) 80%, #0f0f0f 100%)"
      backgroundSize="contain"
      backgroundRepeat="no-repeat"
      p={4}
    >
        <Spinner size="lg" />
    </Center>
  );
}

export default Loading;
