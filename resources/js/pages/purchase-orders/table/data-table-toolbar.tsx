import { DataTableFacetedFilter } from "@/components/data-table-faceted-filter"
import { DataTableViewOptions } from "@/components/data-table-view-options"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table } from "@tanstack/react-table"
import { X } from "lucide-react"
import { supplierOptions } from "./po-filter-options"

interface DataTableToolbarProps<TData> {
    table: Table<TData>
}

  export function DataTableToolbar<TData>({
    table,
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
          <div className="flex gap-2 items-center">
            {table.getColumn("supplier") && (
                <DataTableFacetedFilter
                    column={table.getColumn("supplier")}
                    title="Supplier"
                    options={supplierOptions}
                />
            )}
            {isFiltered && (
                <Button
                variant="ghost"
                onClick={() => table.resetColumnFilters()}
                className="h-8 px-2 lg:px-3"
                >
                Reset
                <X />
                </Button>
            )}
          </div>
        </div>
        <DataTableViewOptions table={table} />
      </div>
    )
}
