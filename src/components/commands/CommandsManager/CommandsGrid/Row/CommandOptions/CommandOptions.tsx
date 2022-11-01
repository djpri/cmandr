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
import DeleteCommandButton from "components/commands/DeleteCommandButton";
import EditCommandForm from "components/commands/EditCommandForm";
import { CommandReadDto } from "models/command";
import { useState } from "react";
import { AiFillSetting } from "react-icons/ai";

type IProps = {
  command: CommandReadDto;
};

function CommandOptions({ command }: IProps) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [isVisible, setIsVisible] = useState(false);

  return (
    <Box m="0">
      <Popover
        isLazy
        lazyBehavior="unmount"
        placement="right"
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      >
        <PopoverTrigger>
          <Button size="xs" variant="options">
            <AiFillSetting />
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
