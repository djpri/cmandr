import { IconButton, Input, Button, HStack } from "@chakra-ui/react";
import * as React from "react";
import { GoPlus } from "react-icons/go";

function AddCommandCategory() {
  const [category, setCategory] = React.useState("");
  return (
    <>
      <IconButton
        size="xs"
        aria-label="add command category"
        icon={<GoPlus />}
      />
      <HStack>
        <Input value={category} onChange={(e) => setCategory(e.target.value)} />
        <Button>Save</Button>
      </HStack>
    </>
  );
}

export default AddCommandCategory;
