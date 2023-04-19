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
import useTableSelectors from "hooks/table/useTableSelectors";
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
  const hoverColor = useColorModeValue("gray.200", "gray.600");
  const selectedRowColor = useColorModeValue("gray.300", "blue.600");
  const categoryTextColor = useColorModeValue("gray.500", "gray.300");
  const { multiSelectRow } = useTableSelectors<CommandReadDto>({
    table,
    row,
    requireClickToSelect: true,
  });
  
  const [isCopied, setIsCopied] = useState(false);
  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  };

  return (
    <Grid
      templateColumns={["1fr", null, null, "1.7fr 2fr 1fr 1fr"]}
      px={4}
      py={2}
      gap={4}
      rounded="none"
      className="gridRow clickToSelect"
      bgColor={row.getIsSelected() && selectedRowColor}
      _hover={{
        bgColor: row.getIsSelected() && selectedRowColor,
      }}
      onMouseDown={multiSelectRow}
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

      <GridItem className="clickToSelect">
        {showCategories && (
          <HStack>
            <AiFillFolder color={categoryTextColor} />
            <Text color={categoryTextColor}>{commandItem.category.name}</Text>
          </HStack>
        )}
      </GridItem>

      <GridItem
        className="clickToSelect"
        gap="2"
        display="flex"
        alignItems="flex-start"
        justifyContent="flex-end"
      >
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
        <CommandOptions
          command={{
            id,
            description,
            line,
            reference,
            category,
          }}
        />
      </GridItem>
    </Grid>
  );
}

export default CommandRow;
