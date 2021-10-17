import { Tr, Td, Code, HStack, Button, Link } from "@chakra-ui/react";
import React from "react";
import { GoLinkExternal } from "react-icons/go";
import CommandOptions from "../CommandOptions/CommandOptions";
import { CopyToClipboard } from "react-copy-to-clipboard";

function TableRow({ commandItem, key }) {
  const { id, howTo, command, reference, category } = commandItem;
  const [isCopied, setIsCopied] = React.useState(false);

  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  };

  return (
    <Tr key={key}>
      <Td>{howTo}</Td>

      <Td>
        <Code
          _hover={{
            cursor: "pointer",
            backgroundColor: "gray.200",
            color: "black",
          }}
          onClick={() => handleCopy()}
        >
          {command}
        </Code>
      </Td>

      <Td>{category}</Td>

      <Td>
        <HStack spacing="4">
          <CopyToClipboard text={command} onCopy={() => handleCopy()}>
            <Button
              size="xs"
              bgColor={isCopied ? "blue.400" : "blue.500"}
              color="white"
              w="70px"
            >
              {isCopied ? "Copied" : "Copy"}
            </Button>
          </CopyToClipboard>
          {/* BUTTONS */}
          <Link target="_blank" rel="noreferrer" href={reference}>
            <Button
              size="xs"
              bgColor="cyan.600"
              color="white"
              leftIcon={<GoLinkExternal />}
            >
              Link
            </Button>
          </Link>
          <CommandOptions
            commandId={id}
            command={{ id, howTo, command, reference, category }}
          />
        </HStack>
      </Td>
    </Tr>
  );
}

export default TableRow;
