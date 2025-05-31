import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable } from  "@tanstack/react-table"
import React, { useState } from "react"
import { DataTableToolbar } from "./data-table-toolbar"
import { DataTablePagination } from "@/components/data-table-pagination"
import { DataTableColumnHeader } from "@/components/data-table-column-header"
import { LocationItem, ProductItem } from "@/types/local"
import { Ellipsis } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "@inertiajs/react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { DialogConfirmDelete } from "@/components/dialog-confirm-delete"

interface DataTableProps {
    data: LocationItem[]
  }

export function LocationDataTable({
    data,
  }: DataTableProps)  {

    const [dialogOpen, setDialogOpen] = useState<boolean | undefined>(false)
    const [selectedRow, setSelectedRow] = useState<LocationItem | null>(null)

    function handleDialogOpen(location : LocationItem) {
        setDialogOpen(true)
        setSelectedRow(location)
    }

    function handleDialogClose() {
        setDialogOpen(false)
        setSelectedRow(null)
    }

    function handleDelete() {
        console.log(selectedRow)
    }

    const columns: ColumnDef<LocationItem>[] = [
        {
            accessorKey: 'id',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="ID" />
            ),
            cell: info => info.getValue(),
        },
        {
            accessorKey: 'name',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Nama" />
            ),
            cell: info => info.getValue(),
        },
        {
            accessorKey: 'address',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Alamat" />
            ),
            cell: info => info.getValue(),
        },
        {
            id: 'actions',
            header: 'Actions',
            cell: ({row}) => <LocationActionsRow location={row.original} handleDialogOpen={handleDialogOpen}/>,
            enableHiding: false,
        }
    ]

    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [sorting, setSorting] = useState<SortingState>([])

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnFilters,
        },
        initialState: {
            columnVisibility: {
                quantity: false
            }
        },
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    return(
        <div className="space-y-4">
            <DataTableToolbar table={table} />
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                            return (
                            <TableHead key={header.id}>
                                {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                    )}
                            </TableHead>
                            )
                        })}
                        </TableRow>
                    ))}
                    </TableHeader>
                    <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                        <TableRow
                            key={row.id}
                        >
                            {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                            ))}
                        </TableRow>
                        ))
                    ) : (
                        <TableRow>
                        <TableCell colSpan={columns.length} className="h-24 text-center">
                            No results.
                        </TableCell>
                        </TableRow>
                    )}
                    </TableBody>
                </Table>
            </div>
            <DataTablePagination table={table} />
            <DialogConfirmDelete
                nomor={selectedRow?.name ?? ""}
                open={dialogOpen}
                handleDelete={handleDelete}
                handleDialogClose={handleDialogClose}
            />
        </div>
    )
}

interface LocationsActionRowProps {
    location: LocationItem
    handleDialogOpen: (location: LocationItem) => void
}

function LocationActionsRow({location, handleDialogOpen} : LocationsActionRowProps) {
    return(
        <div className="flex gap-2">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant={"ghost"} size={"icon"}>
                        <Ellipsis />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                    <DropdownMenuGroup>
                        <Link href={'#'}>
                            <DropdownMenuItem>
                                Lihat
                            </DropdownMenuItem>
                        </Link>
                        <Link href={'#'}>
                            <DropdownMenuItem>
                                Edit
                            </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem onClick={() => handleDialogOpen(location)}>
                            Hapus
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
