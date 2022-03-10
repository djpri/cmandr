import { useToast } from "@chakra-ui/toast";

function useChakraToast() {
  const toast = useToast();
  const showSuccessToast = (title: string, description: string) => {
    toast({
      title,
      description,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };
  const showErrorToast = () => {
    toast({
      title: "Error",
      description: "something went wrong",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  };
  return {
    showSuccessToast,
    showErrorToast,
  };
}

export default useChakraToast;
