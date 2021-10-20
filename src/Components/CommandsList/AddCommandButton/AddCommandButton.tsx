import { Button, Collapse, useDisclosure } from "@chakra-ui/react";
import * as React from "react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import AddCommandForm from "../../shared/AddCommandForm/AddCommandForm";

function AddCommandButton() {
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
      <Collapse in={isOpen} animateOpacity>
        <AddCommandForm />
      </Collapse>
    </>
  );
}

export default AddCommandButton;
