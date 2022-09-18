import {
  Button,
  Code,
  Grid,
  GridItem,
  HStack,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { CommandReadDto } from "models/command";
import { Key, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { AiFillFolder } from "react-icons/ai";
import { GoLinkExternal } from "react-icons/go";
import CommandOptions from "./CommandOptions/CommandOptions";

type Props = {
  commandItem: CommandReadDto;
  showCategories: boolean;
  isSelected: boolean;
  toggleCurrentRow: (set?: boolean) => void;
  toggleAllRowsSelected: (set?: boolean) => void;
  selectedRowIds: Record<Key, boolean>;
  toggleOtherRow: (key: Key, set?: boolean) => void;
  rowId: Key;
};

function Row({
  commandItem,
  showCategories,
  isSelected,
  toggleCurrentRow,
  toggleAllRowsSelected,
  toggleOtherRow,
  selectedRowIds,
  rowId,
}: Props) {
  const { id, description, line, reference, category } = commandItem;
  const [isCopied, setIsCopied] = useState(false);
  const hoverColor = useColorModeValue("gray.200", "gray.600");
  const selectedRowColor = useColorModeValue("gray.300", "blue.600");
  const categoryTextColor = useColorModeValue("gray.500", "gray.300");

  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  };

  const handleClick = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.classList.contains("clickToSelect")) {
      return;
    }
    const wasSelected = isSelected;

    if (event.ctrlKey) {
      toggleCurrentRow();
    } else {
      toggleAllRowsSelected(false);
      toggleCurrentRow(!wasSelected);
    }

    if (event.shiftKey) {
      const keys = Object.keys(selectedRowIds).map((k) => parseInt(k));
      keys.push(rowId as number);
      const min = Math.min(...keys);
      const max = Math.max(...keys);
      for (let i = min; i <= max; i++) {
        toggleOtherRow(i.toString(), true);
      }
      document.getSelection().removeAllRanges();
    }
  };

  return (
    <Grid
      templateColumns={["1fr", null, null, "1.7fr 2fr 1fr 1fr"]}
      alignItems="center"
      px={4}
      py={2}
      gap={4}
      rounded="md"
      className="gridRow clickToSelect"
      bgColor={isSelected && selectedRowColor}
      _hover={{
        bgColor: isSelected && selectedRowColor,
      }}
      onMouseDown={handleClick}
    >
      <GridItem className="clickToSelect">
        {description.charAt(0).toUpperCase() + description.slice(1)}
      </GridItem>

      <GridItem>
        <CopyToClipboard text={line} onCopy={() => handleCopy()}>
          <Code
            p={1}
            overflowX="auto"
            display="block"
            _hover={{
              cursor: "pointer",
              backgroundColor: "gray.300",
              color: "black",
            }}
          >
            {line}
          </Code>
        </CopyToClipboard>
      </GridItem>

      {showCategories && (
        <GridItem>
          <HStack>
            <AiFillFolder color={categoryTextColor} />
            <Text color={categoryTextColor}>{commandItem.category.name}</Text>
          </HStack>
        </GridItem>
      )}

      <GridItem display="flex" flexDirection="row" alignItems="center" gap="2">
        <CopyToClipboard text={line} onCopy={() => handleCopy()}>
          <Button
            size="xs"
            variant="settings"
            w="4rem"
            display={["none", null, null, "block"]}
            _hover={{ bgColor: hoverColor }}
          >
            {isCopied ? "Copied" : "Copy"}
          </Button>
        </CopyToClipboard>
        {/* BUTTONS */}
        {!reference ? (
          <Button
            size="xs"
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
              variant="settings"
              leftIcon={<GoLinkExternal />}
              isDisabled={!reference}
              _hover={{ bgColor: hoverColor }}
            >
              Link
            </Button>
          </Link>
        )}
        <div>
          <CommandOptions
            command={{
              id,
              description,
              line,
              reference,
              category,
            }}
          />
        </div>
      </GridItem>
    </Grid>
  );
}

export default Row;
