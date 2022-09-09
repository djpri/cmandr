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
import DeleteLinkButton from "components/links/DeleteLinkButton/DeleteLinkButton";
import EditLinkForm from "components/links/EditLinkForm/EditLinkForm";
import { LinkReadDto } from "models/link";
import { useState } from "react";
import { AiFillSetting } from "react-icons/ai";

type IProps = {
  link: LinkReadDto;
};

function CommandOptions({ link }: IProps) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [isVisible, setIsVisible] = useState(false);

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
                variant="edit"
                onClick={() => setIsVisible((prevState) => !prevState)}
              >
                Edit
              </Button>
              <DeleteLinkButton linkId={link.id} onClose={onClose} />
            </HStack>
            <Box display={isVisible ? "block" : "none"}>
              <EditLinkForm linkItem={link} onClose={onClose} />
            </Box>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
}

export default CommandOptions;
