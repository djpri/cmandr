import { Row, Table } from "@tanstack/react-table";
import { useCallback } from "react";

function useTableSelectors<TEntity>(table: Table<TEntity>, row: Row<TEntity>) {
  const multiSelectRow = useCallback(
    (event: React.MouseEvent) => {
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
    },
    [table, row]
  );

  return {
    multiSelectRow,
  };
}

export default useTableSelectors;
