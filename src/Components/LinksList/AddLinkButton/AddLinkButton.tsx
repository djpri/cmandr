import { Button, Collapse, useDisclosure } from "@chakra-ui/react";
import * as React from "react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import AddLinkForm from "../../AddLinkForm/AddLinkForm";

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
        <AddLinkForm />
      </Collapse>
    </>
  );
}

export default AddCommandButton;
