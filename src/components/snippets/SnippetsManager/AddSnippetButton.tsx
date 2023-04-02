import { Button, Fade, Portal, useDisclosure } from "@chakra-ui/react";
import { ForwardedRef, RefObject, forwardRef, useEffect, useMemo } from "react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import AddSnippetForm from "../AddSnippetForm";

interface IProps {
  categoryId?: number;
  currentButtonOpen?: "addLink" | "quickAddLink" | "none";
  setCurrentButtonOpen?: (value: "addLink" | "quickAddLink" | "none") => void;
}

const AddLinkButton = forwardRef(
  (props: IProps, ref: ForwardedRef<HTMLDivElement | null>) => {
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

    const portal = useMemo(
      () =>
        props.categoryId ? (
          <AddSnippetForm categoryId={props.categoryId} />
        ) : (
          <AddSnippetForm />
        ),
      []
    );

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
          <Portal containerRef={ref as unknown as RefObject<HTMLElement>}>
            <Fade in={isOpen} unmountOnExit={false}>{portal}</Fade>
          </Portal>
        )}
      </>
    );
  }
);

AddLinkButton.displayName = "AddLinkButton";

export default AddLinkButton;
