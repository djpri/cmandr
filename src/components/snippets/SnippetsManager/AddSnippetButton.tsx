import { Box, Button, Fade, Portal, useDisclosure } from "@chakra-ui/react";
import { ForwardedRef, RefObject, forwardRef, useEffect, useMemo } from "react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import AddSnippetForm from "../AddSnippetForm/AddSnippetForm";

interface IProps {
  categoryId?: number;
  currentButtonOpen?: "addSnippet" | "none";
  setCurrentButtonOpen?: (
    value: "addSnippet" | "none"
  ) => void;
}

const AddSnippetButton = forwardRef(
  (props: IProps, ref: ForwardedRef<HTMLDivElement | null>) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
      props.currentButtonOpen === "addSnippet" ? onOpen() : onClose();
    }, [props.currentButtonOpen, onOpen, onClose]);

    useEffect(() => {
      const onResize = () => {
        handleClose();
      };
      addEventListener("resize", onResize);
      return () => {
        removeEventListener("resize", onResize);
      };
    }, []);

    const handleOpen = () => {
      props.setCurrentButtonOpen("addSnippet");
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
      <Box mb={5}>
        {isOpen ? (
          <Button onClick={handleClose} rightIcon={<AiFillCaretUp />}>
            Add
          </Button>
        ) : (
          <Button onClick={handleOpen} rightIcon={<AiFillCaretDown />}>
            Add
          </Button>
        )}
        {ref && props.currentButtonOpen === "addSnippet" && (
          <Portal containerRef={ref as unknown as RefObject<HTMLElement>}>
            <Fade in={isOpen} unmountOnExit={false}>
              {portal}
            </Fade>
          </Portal>
        )}
      </Box>
    );
  }
);

AddSnippetButton.displayName = "AddLinkButton";

export default AddSnippetButton;
