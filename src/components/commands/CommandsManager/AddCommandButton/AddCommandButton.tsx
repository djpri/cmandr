import {
  Button,
  Collapse,
  Portal,
  useDisclosure,
  forwardRef,
} from "@chakra-ui/react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import AddCommandForm from "../../AddCommandForm/AddCommandForm";

const AddCommandButton = forwardRef((props, ref: any) => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <>
      {isOpen ? (
        <Button onClick={onToggle}>{<AiFillCaretUp />}</Button>
      ) : (
        <Button onClick={onToggle} rightIcon={<AiFillCaretDown />}>
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
