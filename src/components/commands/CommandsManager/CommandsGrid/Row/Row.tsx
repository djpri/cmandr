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
import { Command } from "models/command";
import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { AiFillFolder } from "react-icons/ai";
import { GoLinkExternal } from "react-icons/go";
import CommandOptions from "./CommandOptions/CommandOptions";

type Props = {
  commandItem: Command;
  showCategories: boolean;
};

function Row({ commandItem, showCategories }: Props) {
  const { id, description, line, reference, category } = commandItem;
  const [isCopied, setIsCopied] = useState(false);

  const categoryTextColor = useColorModeValue("gray.500", "gray.300");
  const linkButtonColor = useColorModeValue("#568c9b", "#1f5565");
  const copyButtonColor = useColorModeValue("#71a9dd", "#244e79");

  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  };

  return (
    <Grid
      templateColumns={["1fr", null, null, "1.7fr 2fr 1fr 1fr"]}
      p="4"
      gap={4}
      rounded="md"
      className="gridRow"
    >
      <GridItem>
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
              backgroundColor: "gray.200",
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
            <AiFillFolder color="gray" />
            <Text color={categoryTextColor}>{commandItem.category.name}</Text>
          </HStack>
        </GridItem>
      )}

      <GridItem>
        <HStack spacing="4">
          <CopyToClipboard text={line} onCopy={() => handleCopy()}>
            <Button
              size="xs"
              bgColor={isCopied ? "blue.400" : copyButtonColor}
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
              bgColor={linkButtonColor}
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
                bgColor={linkButtonColor}
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
              line,
              reference,
              category,
            }}
          />
        </HStack>
      </GridItem>
    </Grid>
  );
}

export default Row;
