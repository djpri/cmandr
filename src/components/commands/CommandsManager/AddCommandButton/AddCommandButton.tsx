import {
  Button,
  Collapse,
  forwardRef,
  Portal,
  useDisclosure,
} from "@chakra-ui/react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import AddCommandForm from "../../AddCommandForm/AddCommandForm";

const AddCommandButton = forwardRef((props, ref: any) => {
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
        <Portal containerRef={ref}>
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
});

export default AddCommandButton;
