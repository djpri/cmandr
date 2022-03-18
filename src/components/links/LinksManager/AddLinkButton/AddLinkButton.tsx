import { Button, Collapse, Portal, useDisclosure } from "@chakra-ui/react";
import { forwardRef } from "react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import AddLinkForm from "../../AddLinkForm/AddLinkForm";

interface IProps {
  categoryId?: number;
}

const AddCommandButton = forwardRef((props: IProps, ref: any) => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <>
      {isOpen ? (
        <Button onClick={onToggle} mb="4">
          {<AiFillCaretUp />}
        </Button>
      ) : (
        <Button onClick={onToggle} mb="4" rightIcon={<AiFillCaretDown />}>
          Add
        </Button>
      )}
      {ref && (
        <Portal containerRef={ref}>
          <Collapse in={isOpen} animateOpacity>
            {props.categoryId ? (
              <AddLinkForm categoryId={props.categoryId} />
            ) : (
              <AddLinkForm />
            )}
          </Collapse>
        </Portal>
      )}
    </>
  );
});

export default AddCommandButton;
