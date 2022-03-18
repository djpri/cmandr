import { LinksSortFunction } from "helpers/linksSortFunctions";
import { LinkReadDto } from "models/link";
import { useEffect, useMemo, useState } from "react";

/**
 * Takes an array of links as input and then returns a filtered and sorted array of links
 * @param links
 */
function useLinksFilter(links: LinkReadDto[]) {
  const [search, setSearch] = useState<string>("");
  const [searchResults, setSearchResults] = useState<LinkReadDto[]>(null);
  const [sortFunction, setSortFunction] = useState<LinksSortFunction>(null);

  const filterLinks = useMemo(() => {
    let newArray = [];
    // search description text or command line text
    if (links?.length >= 1) {
      newArray = links.filter(
        (item: LinkReadDto) =>
          item.url.match(
            new RegExp(search.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1"), "i")
          ) ||
          item.title.match(
            new RegExp(search.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1"), "i")
          )
      );
    }
    // then perform sort
    if (sortFunction) {
      newArray.sort(sortFunction);
    }
    return newArray;
  }, [search, links, sortFunction]);

  // filter links on search
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchResults(filterLinks);
    }, 100);
    return () => {
      clearTimeout(timeout);
    };
  }, [filterLinks]);

  return {
    filteredLinks: searchResults,
    search,
    setSearch,
    sortFunction,
    setSortFunction,
  };
}

export default useLinksFilter;
