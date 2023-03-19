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
import { Row, Table } from "@tanstack/table-core";
import { CommandReadDto } from "models/command";
import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { AiFillFolder } from "react-icons/ai";
import { GoLinkExternal } from "react-icons/go";
import CommandOptions from "./CommandOptions/CommandOptions";

type Props = {
  commandItem: CommandReadDto;
  showCategories: boolean;
  table: Table<CommandReadDto>;
  row: Row<CommandReadDto>;
};

function CommandRow({ row, table, showCategories, commandItem }: Props) {
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
    const wasSelected = row.getIsSelected();

    if (event.ctrlKey) {
      row.toggleSelected();
    } else {
      table.toggleAllRowsSelected(false);
      row.toggleSelected(!wasSelected);
    }

    if (event.shiftKey) {
      const keys = table
        .getSelectedRowModel()
        .flatRows.map((k) => parseInt(k.id));
      keys.push(parseInt(row.id));
      const min = Math.min(...keys);
      const max = Math.max(...keys);
      const allRowsToSelect = table
        .getRowModel()
        .flatRows.slice(min, max + 1)
        .map((k) => parseInt(k.id));
      const rowSelection = allRowsToSelect.reduce((m, v) => {
        m[v] = true;
        return m;
      }, {});
      table.setRowSelection(rowSelection);
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
      rounded="none"
      className="gridRow clickToSelect"
      bgColor={row.getIsSelected() && selectedRowColor}
      _hover={{
        bgColor: row.getIsSelected() && selectedRowColor,
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

export default CommandRow;
