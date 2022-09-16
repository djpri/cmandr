import { Input } from "@chakra-ui/react";
import { useState } from "react";
import { useAsyncDebounce } from "react-table";

function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 400);

  return (
    <Input
      mb={2}
      value={value || ""}
      maxW="sm"
      onChange={(e) => {
        setValue(e.target.value);
        onChange(e.target.value);
      }}
      placeholder={count > 1 ? `Search all ${count} items...` : "Search"}
      disabled={count <= 1}
    />
  );
}

export default GlobalFilter;
