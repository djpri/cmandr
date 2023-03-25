import {
  Button,
  Collapse,
  forwardRef,
  Portal,
  useDisclosure,
} from "@chakra-ui/react";
import AddCommandForm from "components/commands/AddCommandForm/AddCommandForm";
import { ForwardedRef, RefObject } from "react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

const AddCommandButton = forwardRef(
  (props, ref: ForwardedRef<HTMLDivElement | null>) => {
    const { isOpen, onToggle } = useDisclosure();
    return (
      <>
        {isOpen ? (
          <Button aria-label="hide add command form" onClick={onToggle}>
            {<AiFillCaretUp />}
          </Button>
        ) : (
          <Button
            aria-label="show add command form"
            onClick={onToggle}
            rightIcon={<AiFillCaretDown />}
          >
            Add
          </Button>
        )}
        {ref && (
          <Portal containerRef={ref as unknown as RefObject<HTMLElement>}>
            <Collapse in={isOpen} animateOpacity>
              {props.categoryId ? (
                <AddCommandForm categoryId={props.categoryId} />
              ) : (
                <AddCommandForm />
              )}
            </Collapse>
          </Portal>
        )}
      </>
    );
  }
);

export default AddCommandButton;
