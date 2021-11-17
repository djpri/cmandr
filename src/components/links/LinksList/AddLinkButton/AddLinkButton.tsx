import { Button, Collapse, Portal, useDisclosure } from "@chakra-ui/react";
import * as React from "react";
import { forwardRef } from "react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import AddLinkForm from "../../AddLinkForm/AddLinkForm";

const AddCommandButton = forwardRef((props, ref: any) => {
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
            <AddLinkForm />
          </Collapse>
        </Portal>
      )}
    </>
  );
});

export default AddCommandButton;
