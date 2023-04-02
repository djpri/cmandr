import { Input } from "@chakra-ui/react";
import { Table } from "@tanstack/table-core";
import { CommandReadDto } from "models/command";
import { LinkReadDto } from "models/link";
import { InputHTMLAttributes, useEffect, useState } from "react";

type PropTypes = {
  value: string | number;
  onChange: (value: string | number) => void;
  table: Table<CommandReadDto> | Table<LinkReadDto>;
  debounce?: number;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "onChange">;

function GlobalFilter({
  value: initialValue,
  onChange,
  debounce = 200,
  table,
}: PropTypes) {
  const count = table.getPreFilteredRowModel().rows.length;
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <Input
      mb={2}
      value={value || ""}
      maxW="sm"
      onChange={(e) => setValue(e.target.value)}
      placeholder={count > 1 ? `Search all ${count} items...` : "Search"}
      disabled={count <= 1}
    />
  );
}

export default GlobalFilter;
