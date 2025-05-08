import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable } from  "@tanstack/react-table"
import React, { useState } from "react"
import { DataTableToolbar } from "./data-table-toolbar"
import { DataTablePagination } from "@/components/data-table-pagination"
import { DataTableColumnHeader } from "@/components/data-table-column-header"
import { PurchaseOrderItem } from "@/types/local"
import { Ellipsis } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "@inertiajs/react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { DialogConfirmDelete } from "@/components/dialog-confirm-delete"
import POSheetContent from "../partials/sheet-contents"

interface DataTableProps {
    data: PurchaseOrderItem[]
  }

export function PurchaseOrderTable({
    data,
  }: DataTableProps)  {

    const [dialogOpen, setDialogOpen] = useState<boolean | undefined>(false)
    const [selectedRow, setSelectedRow] = useState<PurchaseOrderItem | null>(null)

    function handleDialogOpen(purchase_order : PurchaseOrderItem) {
        setDialogOpen(true)
        setSelectedRow(purchase_order)
    }

    function handleDialogClose() {
        setDialogOpen(false)
        setSelectedRow(null)
    }

    function handleDelete() {
        console.log(selectedRow)
    }

    const columns: ColumnDef<PurchaseOrderItem>[] = [
        {
            accessorKey: 'nomor',
            id: 'no. invoice',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="No. Invoice" />
            ),
            cell: ({row}) => <POSheetContent label={row.original.nomor} purchase_order={row.original}/>,
        },
        {
            accessorKey: 'supplier.name',
            id: 'supplier',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Supplier" />
            ),
            cell: ({row}) => <POSheetContent label={row.original.supplier.name} purchase_order={row.original}/>,
            filterFn: (row, id, value) => {
                return value.includes(row.getValue(id))
            },
        },
        {
            accessorKey: 'purchase_date',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Tanggal PO" />
            ),
            cell: ({row}) => <POSheetContent label={row.original.purchase_date} purchase_order={row.original}/>,
        },
        {
            accessorKey: 'quantity',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Jumlah Unit (L)" />
            ),
            cell: ({row}) => <POSheetContent label={row.original.quantity.toLocaleString()} purchase_order={row.original}/>,
        },
        {
            accessorKey: 'price',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Total Harga" />
            ),
            cell: ({row}) => <POSheetContent label={`Rp ${row.original.price.toLocaleString()}`} purchase_order={row.original}/>,
        },
        {
            id: 'actions',
            header: 'Actions',
            cell: ({row}) => <POActionsRow purchase_order={row.original} handleDialogOpen={handleDialogOpen}/>,
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
                nomor={selectedRow?.nomor ?? ""}
                open={dialogOpen}
                handleDelete={handleDelete}
                handleDialogClose={handleDialogClose}
            />
        </div>
    )
}

interface POActionRowProps {
    purchase_order: PurchaseOrderItem
    handleDialogOpen: (purchase_order : PurchaseOrderItem) => void
}

function POActionsRow({purchase_order, handleDialogOpen} : POActionRowProps) {
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
                        <Link href={route('purchase-orders.detail', [1])}>
                            <DropdownMenuItem>
                                Lihat
                            </DropdownMenuItem>
                        </Link>
                        <Link href={route('purchase-orders.edit', [1])}>
                            <DropdownMenuItem>
                                Edit
                            </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem onClick={() => handleDialogOpen(purchase_order)}>
                            Hapus
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
