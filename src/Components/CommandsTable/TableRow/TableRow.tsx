import {
  Tr,
  Td,
  Code,
  HStack,
  Button,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";
import { GoLinkExternal } from "react-icons/go";
import CommandOptions from "./CommandOptions/CommandOptions";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { selectCategoriesAsKeyValuePairs } from "../../../redux/commands/commandsSlice";
import { useSelector } from "react-redux";

function TableRow({ commandItem, showCategories }) {
  const categoriesList = useSelector(selectCategoriesAsKeyValuePairs);
  const { id, description, command, reference, category } = commandItem;
  const [isCopied, setIsCopied] = React.useState(false);

  const rowHoverColor = useColorModeValue("whiteAlpha.600", "blackAlpha.400");

  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  };

  return (
    <Tr
      _hover={{ backgroundColor: rowHoverColor }}
      _focus={{ backgroundColor: "blackAlpha.600" }}
    >
      <Td>{description.charAt(0).toUpperCase() + description.slice(1)}</Td>

      <Td>
        <CopyToClipboard text={command} onCopy={() => handleCopy()}>
          <Code
            _hover={{
              cursor: "pointer",
              backgroundColor: "gray.200",
              color: "black",
            }}
          >
            {command}
          </Code>
        </CopyToClipboard>
      </Td>

      {showCategories && <Td>{categoriesList[category?.id]}</Td>}

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
          {!reference ? (
            <Button
              size="xs"
              bgColor="cyan.600"
              color="white"
              leftIcon={<GoLinkExternal />}
              isDisabled={!reference}
            >
              Link
            </Button>
          ) : (
            <Link
              target="_blank"
              rel="noreferrer"
              href={reference}
              style={{ textDecoration: "none" }}
            >
              <Button
                size="xs"
                bgColor="cyan.600"
                color="white"
                leftIcon={<GoLinkExternal />}
                isDisabled={!reference}
              >
                Link
              </Button>
            </Link>
          )}

          <CommandOptions
            command={{
              id,
              description,
              command,
              reference,
              category,
            }}
          />
        </HStack>
      </Td>
    </Tr>
  );
}

export default TableRow;
