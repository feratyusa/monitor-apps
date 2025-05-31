import { DataTableViewOptions } from "@/components/data-table-view-options"
import { Input } from "@/components/ui/input"
import { Table } from "@tanstack/react-table"

interface DataTableToolbarProps<TData> {
    table: Table<TData>,
}

  export function DataTableToolbar<TData>({
    table
  }: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0

    return (
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2 items-center flex-1 md:flex-row md:items-center space-x-2">
          <Input
            placeholder="Filter ..."
            value={(table.getState().globalFilter as string) ?? ""}
            onChange={(event) =>
              table.setGlobalFilter(event.target.value)
            }
            className="h-8 w-full md:w-[150px] lg:w-[250px]"
          />
        </div>
        <DataTableViewOptions table={table} />
      </div>
    )
}
