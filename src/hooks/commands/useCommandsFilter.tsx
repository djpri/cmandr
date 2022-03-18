import { CommandSortFunction } from "helpers/commandsSortFunctions";
import { CommandReadDto } from "models/command";
import { useEffect, useMemo, useState } from "react";

/**
 * Takes an array of commands as input and then returns a filtered and sorted array of commands
 * @param commands
 */
function useCommandsFilter(commands: CommandReadDto[]) {
  const [search, setSearch] = useState<string>("");
  const [searchResults, setSearchResults] = useState<CommandReadDto[]>(null);
  const [sortFunction, setSortFunction] = useState<CommandSortFunction>(null);

  const filterCommands = useMemo(() => {
    let newArray = [];
    // search description text or command line text
    if (commands?.length >= 1) {
      newArray = commands.filter(
        (item: CommandReadDto) =>
          item.description.match(
            new RegExp(search.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1"), "i")
          ) ||
          item.line.match(
            new RegExp(search.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1"), "i")
          )
      );
    }
    // then perform sort
    if (sortFunction) {
      newArray.sort(sortFunction);
    }
    return newArray;
  }, [search, commands, sortFunction]);

  // filter commands on search
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchResults(filterCommands);
    }, 100);
    return () => {
      clearTimeout(timeout);
    };
  }, [filterCommands]);

  return {
    filteredCommands: searchResults,
    search,
    setSearch,
    sortFunction,
    setSortFunction,
  };
}

export default useCommandsFilter;
