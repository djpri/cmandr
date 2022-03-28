import { Button, Portal, SlideFade, useDisclosure } from "@chakra-ui/react";
import QuickAddLinkForm from "components/links/QuickAddLinkForm/QuickAddLinkForm";
import { forwardRef, useEffect } from "react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

interface IProps {
  categoryId?: number;
  currentButtonOpen?: "addLink" | "quickAddLink" | "none";
  setCurrentButtonOpen?: (value: "addLink" | "quickAddLink" | "none") => void;
}

const AddQuickLink = forwardRef((props: IProps, ref: any) => {
  const { onOpen, onClose, isOpen } = useDisclosure();

  useEffect(() => {
    props.currentButtonOpen === "quickAddLink" ? onOpen() : onClose();
  }, [props.currentButtonOpen, onOpen, onClose]);

  const handleOpen = () => {
    props.setCurrentButtonOpen("quickAddLink");
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
          Quick Add
        </Button>
      ) : (
        <Button onClick={handleOpen} rightIcon={<AiFillCaretDown />}>
          Quick Add
        </Button>
      )}
      {ref && props.currentButtonOpen === "quickAddLink" && (
        <Portal containerRef={ref}>
          <SlideFade in={isOpen}>
            {props.categoryId ? (
              <QuickAddLinkForm categoryId={props.categoryId} />
            ) : (
              <QuickAddLinkForm />
            )}
          </SlideFade>
        </Portal>
      )}
    </>
  );
});

export default AddQuickLink;
