import { Row, Table } from "@tanstack/react-table";
import { useCallback } from "react";

type useTableSelectorsProps<TEntity> = {
  table: Table<TEntity>;
  row: Row<TEntity>;
  requireClickToSelect?: boolean;
};

function useTableSelectors<TEntity>({
  table,
  row,
  requireClickToSelect = false,
}: useTableSelectorsProps<TEntity>) {
  const multiSelectRow = useCallback(
    (event: React.MouseEvent) => {
      const target = event.target as HTMLElement;
      if (requireClickToSelect && !target.classList.contains("clickToSelect")) {
        return;
      }
      if ((event.target as Element).closest("button")) {
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
    },
    [table, row]
  );

  return {
    multiSelectRow,
  };
}

export default useTableSelectors;
