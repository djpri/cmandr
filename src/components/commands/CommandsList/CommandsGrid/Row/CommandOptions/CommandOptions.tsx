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
import { HiDotsVertical } from "react-icons/hi";
import { Command } from "../../../../../../types/types";
import DeleteCommandButton from "../../../../DeleteCommandButton/DeleteCommandButton";
import EditCommandForm from "../../../../EditCommandForm/EditCommandForm";

type IProps = {
  command: Command;
  isLoading: boolean;
};

function CommandOptions({ command, isLoading }: IProps) {
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
          <Button
            size="xs"
            bgColor="teal.500"
            color="white"
            isDisabled={isLoading}
          >
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
