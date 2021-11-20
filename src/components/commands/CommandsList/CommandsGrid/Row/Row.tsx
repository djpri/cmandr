import {
  GridItem,
  Code,
  HStack,
  Button,
  Link,
  Grid,
  Text,
  Skeleton,
  useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";
import { GoLinkExternal } from "react-icons/go";
import CommandOptions from "./CommandOptions/CommandOptions";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { selectCategoriesAsKeyValuePairs } from "../../../../../redux/commands/commandsSlice";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Command } from "../../../../../types/types";
import { AiFillFolder } from "react-icons/ai";

type Props = {
  commandItem: Command;
  showCategories: boolean;
  isLoading: boolean | null;
};

function Row({ commandItem, showCategories, isLoading }: Props) {
  const categoriesList = useSelector(selectCategoriesAsKeyValuePairs);
  const { id, description, command, reference, category } = commandItem;
  const [isCopied, setIsCopied] = useState(false);
  const categoryTextColor = useColorModeValue("gray.500", "gray.300");

  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  };

  return (
    <Grid
      templateColumns={["1fr", null, null, "2fr 2fr 1fr 1fr"]}
      p="4"
      gap={4}
      rounded="md"
      className="gridRow"
    >
      <Skeleton isLoaded={!isLoading}>
        <GridItem>
          {description.charAt(0).toUpperCase() + description.slice(1)}
        </GridItem>
      </Skeleton>

      <Skeleton isLoaded={!isLoading}>
        <GridItem bgColor={isLoading && "blackAlpha.400"}>
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
        </GridItem>
      </Skeleton>

      {showCategories && (
        <Skeleton isLoaded={!isLoading}>
          <GridItem bgColor={isLoading && "blackAlpha.400"}>
            <HStack>
              <AiFillFolder color="gray" />
              <Text color={categoryTextColor}>
                {categoriesList[category?.id]}
              </Text>
            </HStack>
          </GridItem>
        </Skeleton>
      )}

      <Skeleton isLoaded={!isLoading}>
        <GridItem>
          <HStack spacing="4">
            <CopyToClipboard text={command} onCopy={() => handleCopy()}>
              <Button
                isDisabled={isLoading}
                size="xs"
                bgColor={isCopied ? "blue.400" : "blue.500"}
                color="white"
                w="70px"
                display={["none", null, null, "block"]}
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
                isDisabled={!reference || isLoading}
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
                  isDisabled={!reference || isLoading}
                >
                  Link
                </Button>
              </Link>
            )}
            <CommandOptions
              isLoading={isLoading}
              command={{
                id,
                description,
                command,
                reference,
                category,
              }}
            />
          </HStack>
        </GridItem>
      </Skeleton>
    </Grid>
  );
}

export default Row;
