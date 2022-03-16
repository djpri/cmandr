import { GridItem, HStack, IconButton, Text, Tooltip } from "@chakra-ui/react";
import { sortFunctions } from "helpers/commandsSortFunctions";
import { CommandReadDto } from "models/command";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

interface IProps {
  sortFunction?: (a: CommandReadDto, b: CommandReadDto) => 1 | -1;
  setSortFunction?: React.Dispatch<
    React.SetStateAction<(a: CommandReadDto, b: CommandReadDto) => 1 | -1>
  >;
  label: string;
  field: "line" | "description" | "category";
}

function Header({ sortFunction, setSortFunction, label, field }: IProps) {
  return (
    <GridItem>
      <HStack>
        <Text>{label}</Text>
        <Tooltip label="sort A -> Z" openDelay={500}>
          <IconButton
            size="xs"
            onClick={() => setSortFunction(() => sortFunctions[field].ascend)}
            icon={<AiFillCaretUp />}
            aria-label="sort how to field ascending"
          />
        </Tooltip>
        <Tooltip label="sort Z -> A" openDelay={500}>
          <IconButton
            size="xs"
            onClick={() => setSortFunction(() => sortFunctions[field].descend)}
            icon={<AiFillCaretDown />}
            aria-label="sort how to field descending"
          />
        </Tooltip>
      </HStack>
    </GridItem>
  );
}

export default Header;
