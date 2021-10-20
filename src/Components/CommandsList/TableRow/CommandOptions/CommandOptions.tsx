import {
  Box,
  Button,
  HStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  useDisclosure,
} from "@chakra-ui/react";
import * as React from "react";
import { IoMdOptions } from "react-icons/io";
import DeleteCommandButton from "../../../shared/DeleteCommandButton/DeleteCommandButton";
import EditCommandForm from "../../../shared/EditCommandForm/EditCommandForm";

function CommandOptions({ commandId, command }) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [isVisible, setIsVisible] = React.useState(false);

  return (
    <Box m="0" position="relative">
      <Popover
        isLazy
        lazyBehavior="unmount"
        placement="right"
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      >
        <PopoverTrigger>
          <Button size="xs" bgColor="teal.500" color="white">
            <IoMdOptions />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader fontWeight="semibold">Options</PopoverHeader>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            <HStack>
              <Button
                size="xs"
                colorScheme="orange"
                // bgColor="green.500"
                // color="white"
                onClick={() => setIsVisible((prevState) => !prevState)}
              >
                Edit
              </Button>
              <DeleteCommandButton commandId={commandId} onClick={onClose} />
            </HStack>
            <Box display={isVisible ? "block" : "none"}>
              <EditCommandForm commandItem={command} onClose={onClose} />
            </Box>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
}

export default CommandOptions;
