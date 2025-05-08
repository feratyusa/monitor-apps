import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable } from  "@tanstack/react-table"
import React, { useState } from "react"
import { DataTableToolbar } from "./data-table-toolbar"
import { DataTablePagination } from "@/components/data-table-pagination"
import { DataTableColumnHeader } from "@/components/data-table-column-header"
import { SupplierItem } from "@/types/local"
import { Ellipsis } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "@inertiajs/react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { DialogConfirmDelete } from "@/components/dialog-confirm-delete"
import SupplierSheetContent from "../partials/sheet-contents"
import CollectbilityBadge from "@/components/collectbility-badge"

interface DataTableProps {
    data: SupplierItem[]
  }

export function SupplierDataTable({
    data,
  }: DataTableProps)  {

    const [dialogOpen, setDialogOpen] = useState<boolean | undefined>(false)
    const [selectedRow, setSelectedRow] = useState<SupplierItem | null>(null)

    function handleDialogOpen(supplier : SupplierItem) {
        setDialogOpen(true)
        setSelectedRow(supplier)
    }

    function handleDialogClose() {
        setDialogOpen(false)
        setSelectedRow(null)
    }

    function handleDelete() {
        console.log(selectedRow)
    }

    const columns: ColumnDef<SupplierItem>[] = [
        {
            accessorKey: 'name',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Nama" />
            ),
            cell: ({row}) => <SupplierSheetContent label={row.original.name} supplier={row.original}/>,
        },
        {
            accessorKey: 'address',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Alamat" />
            ),
            cell: ({row}) => <SupplierSheetContent label={row.original.address} supplier={row.original}/>,
        },
        {
            accessorKey: 'contact_person',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Contact Person" />
            ),
            cell: ({row}) => <SupplierSheetContent label={row.original.contact_person} supplier={row.original}/>,
        },
        {
            accessorKey: 'phone1',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Phone" />
            ),
            cell: ({row}) => <SupplierSheetContent label={row.original.phone1} supplier={row.original}/>,
        },
        {
            accessorKey: 'kolekbilitas',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Kolekbilitas" />
            ),
            cell: ({row}) => <CollectbilityBadge number={row.original.kolekbilitas}/>,
        },
        {
            id: 'actions',
            header: 'Actions',
            cell: ({row}) => <SupplierActionsRow supplier={row.original} handleDialogOpen={handleDialogOpen}/>,
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

interface SupplierActionRowProps {
    supplier: SupplierItem
    handleDialogOpen: (supplier : SupplierItem) => void
}

function SupplierActionsRow({supplier, handleDialogOpen} : SupplierActionRowProps) {
    return(
        <div className="flex gap-2">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant={"ghost"} size={"icon"}>
                        <Ellipsis />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuGroup>
                        <Link href={route('suppliers.detail', [1])}>
                            <DropdownMenuItem>
                                Lihat
                            </DropdownMenuItem>
                        </Link>
                        {/* <Link href={route('suppliers.edit', [1])}> */}
                            <DropdownMenuItem>
                                Edit
                            </DropdownMenuItem>
                        {/* </Link> */}
                        <DropdownMenuItem onClick={() => handleDialogOpen(supplier)}>
                            Hapus
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
