import { Button, Portal, SlideFade, useDisclosure } from "@chakra-ui/react";
import { forwardRef, useEffect } from "react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import AddLinkForm from "../../AddLinkForm/AddLinkForm";

interface IProps {
  categoryId?: number;
  currentButtonOpen?: "addLink" | "quickAddLink" | "none";
  setCurrentButtonOpen?: (value: "addLink" | "quickAddLink" | "none") => void;
}

const AddLinkButton = forwardRef((props: IProps, ref: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    props.currentButtonOpen === "addLink" ? onOpen() : onClose();
  }, [props.currentButtonOpen, onOpen, onClose]);

  const handleOpen = () => {
    props.setCurrentButtonOpen("addLink");
    onOpen();
  };

  const handleClose = () => {
    props.setCurrentButtonOpen("none");
    onClose();
  };

  return (
    <>
      {isOpen ? (
        <Button onClick={handleClose} rightIcon={<AiFillCaretUp />}>
          Add
        </Button>
      ) : (
        <Button onClick={handleOpen} rightIcon={<AiFillCaretDown />}>
          Add
        </Button>
      )}
      {ref && props.currentButtonOpen === "addLink" && (
        <Portal containerRef={ref}>
          <SlideFade in={isOpen}>
            {props.categoryId ? (
              <AddLinkForm categoryId={props.categoryId} />
            ) : (
              <AddLinkForm />
            )}
          </SlideFade>
        </Portal>
      )}
    </>
  );
});

export default AddLinkButton;
