import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable } from  "@tanstack/react-table"
import React, { useState } from "react"
import { DataTableToolbar } from "./data-table-toolbar"
import { DataTablePagination } from "@/components/data-table-pagination"
import { DataTableColumnHeader } from "@/components/data-table-column-header"
import { ProductItem } from "@/types/local"
import { Ellipsis } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "@inertiajs/react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { DialogConfirmDelete } from "@/components/dialog-confirm-delete"
import CollectbilityBadge from "@/components/collectbility-badge"
import ProductSheetContent from "../partials/sheet-contents"

interface DataTableProps {
    data: ProductItem[]
  }

export function ProductDataTable({
    data,
  }: DataTableProps)  {

    const [dialogOpen, setDialogOpen] = useState<boolean | undefined>(false)
    const [selectedRow, setSelectedRow] = useState<ProductItem | null>(null)

    function handleDialogOpen(supplier : ProductItem) {
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

    const columns: ColumnDef<ProductItem>[] = [
        {
            accessorKey: 'name',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Nama" />
            ),
            cell: ({row}) => <ProductSheetContent label={row.original.name} product={row.original}/>,
        },
        {
            accessorKey: 'address',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Harga per Unit" />
            ),
            cell: ({row}) => <ProductSheetContent label={`Rp ${row.original.price_per_unit.toLocaleString()}`} product={row.original}/>,
        },
        {
            id: 'actions',
            header: 'Actions',
            cell: ({row}) => <SupplierActionsRow product={row.original} handleDialogOpen={handleDialogOpen}/>,
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

interface ProductActionRowProps {
    product: ProductItem
    handleDialogOpen: (supplier : ProductItem) => void
}

function SupplierActionsRow({product, handleDialogOpen} : ProductActionRowProps) {
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
                        {/* <Link href={route('products.detail', [1])}> */}
                            <DropdownMenuItem>
                                Lihat
                            </DropdownMenuItem>
                        {/* </Link> */}
                        {/* <Link href={route('suppliers.edit', [1])}> */}
                            <DropdownMenuItem>
                                Edit
                            </DropdownMenuItem>
                        {/* </Link> */}
                        <DropdownMenuItem onClick={() => handleDialogOpen(product)}>
                            Hapus
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
