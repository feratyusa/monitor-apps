import { DataTableColumnHeader } from "@/components/data-table-column-header"
import { DataTablePagination } from "@/components/data-table-pagination"
import { DialogConfirmDelete } from "@/components/dialog-confirm-delete"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PurchaseHistoryItem } from "@/types/local"
import { Link } from "@inertiajs/react"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem } from "@radix-ui/react-dropdown-menu"
import { ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable } from "@tanstack/react-table"
import { Ellipsis } from "lucide-react"
import { useState } from "react"
import { DataTableToolbar } from "./data-table-toolbar"

interface DataTableProps {
    data: PurchaseHistoryItem[],
  }

export function PurchaseHistoryDataTable({
    data,
  }: DataTableProps)  {

    const [dialogOpen, setDialogOpen] = useState<boolean | undefined>(false)
    const [selectedRow, setSelectedRow] = useState<PurchaseHistoryItem | null>(null)

    function handleDialogOpen(purchase : PurchaseHistoryItem) {
        setDialogOpen(true)
        setSelectedRow(purchase)
    }

    function handleDialogClose() {
        setDialogOpen(false)
        setSelectedRow(null)
    }

    function handleDelete() {
        console.log(selectedRow)
    }

    const columns: ColumnDef<PurchaseHistoryItem>[] = [
        {
            accessorKey: 'id',
            id: 'ID',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="ID" />
            ),
            cell: info => info.getValue(),
        },
        {
            accessorKey: 'buyer',
            id: 'buyer',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Customer" />
            ),
            cell: info => info.getValue(),
        },
        {
            accessorKey: 'location.name',
            id: 'location',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Cabang" />
            ),
            cell: info => info.getValue(),
        },
        {
            accessorKey: 'amount',
            id: 'amount',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Jumlah (kL)" />
            ),
            cell: info => Number(info.getValue()).toLocaleString(),
        },
        {
            accessorKey: 'total_price',
            id: 'total_price',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Total Harga" />
            ),
            cell: info => "Rp " + Number(info.getValue()).toLocaleString(),
        },
        {
            accessorKey: 'purchase_date',
            id: 'purchase_date',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Tanggal Pembelian" />
            ),
            cell: info => info.getValue(),
        },
        {
            id: 'actions',
            header: 'Actions',
            cell: ({row}) =>
                <PurchaseActionsRow
                    purchase={row.original}
                    handleDialogOpen={handleDialogOpen}
                />,
            enableHiding: false,
        }
    ]

    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
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
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    return(
        <div className="space-y-4">
            <DataTableToolbar table={table}/>
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
                nomor={selectedRow?.id.toLocaleString() ?? ""}
                open={dialogOpen}
                handleDelete={handleDelete}
                handleDialogClose={handleDialogClose}
            />
        </div>
    )
}

interface PurchaseActionRowProps {
    purchase: PurchaseHistoryItem
    handleDialogOpen: (purchase: PurchaseHistoryItem) => void
}

function PurchaseActionsRow({purchase, handleDialogOpen} : PurchaseActionRowProps) {
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
                        <DropdownMenuItem onClick={() => handleDialogOpen(purchase)}>
                            Hapus
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
