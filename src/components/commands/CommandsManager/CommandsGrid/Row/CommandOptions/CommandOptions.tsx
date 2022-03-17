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
import { Command } from "models/command";
import DeleteCommandButton from "components/commands/DeleteCommandButton/DeleteCommandButton";
import EditCommandForm from "components/commands/EditCommandForm/EditCommandForm";
import * as React from "react";
import { HiDotsVertical } from "react-icons/hi";

type IProps = {
  command: Command;
};

function CommandOptions({ command }: IProps) {
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
            <HiDotsVertical />
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
                onClick={() => setIsVisible((prevState) => !prevState)}
              >
                Edit
              </Button>
              <DeleteCommandButton commandId={command.id} onClose={onClose} />
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
