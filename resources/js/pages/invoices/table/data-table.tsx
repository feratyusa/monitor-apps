import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable } from  "@tanstack/react-table"
import React, { useState } from "react"
import { DataTableToolbar } from "./data-table-toolbar"
import { DataTablePagination } from "@/components/data-table-pagination"
import { DataTableColumnHeader } from "@/components/data-table-column-header"
import InvoiceSheetContents from "../partials/sheet-contents"
import { InvoiceItem, SelectOptionAttribute } from "@/types/local"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import CollectbilityBadge from "@/components/collectbility-badge"
import PaymentStatusBadge from "@/components/paymentstatus-badge"
import { RefreshCcwDot, Ellipsis } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link, useForm } from "@inertiajs/react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { DialogConfirmDelete } from "@/components/dialog-confirm-delete"
import { DialogSwitchPayment } from "../partials/dialog-switch-payment"

interface DataTableProps {
    data: InvoiceItem[],
    kolSelection: SelectOptionAttribute[]
    paidmentSelection: SelectOptionAttribute[]
  }

export function InvoicesDataTable({
    data,
    kolSelection,
    paidmentSelection,
  }: DataTableProps)  {

    const {delete: destroy, put} = useForm()

    const [dialogOpen, setDialogOpen] = useState<boolean | undefined>(false)
    const [switchDialogOpen, setSwitchDialogOpen] = useState<boolean | undefined>(false)
    const [selectedRow, setSelectedRow] = useState<InvoiceItem | null>(null)

    function handleDialogOpen(invoice : InvoiceItem) {
        setDialogOpen(true)
        setSelectedRow(invoice)
    }

    function handleDialogClose() {
        setDialogOpen(false)
        setSelectedRow(null)
    }

    function handleDelete() {
        console.log(selectedRow)
        destroy(route('invoices.destroy', [selectedRow?.id]), {
            onSuccess: handleDialogClose
        })
    }

    function handleSwitchDialogOpen(invoice: InvoiceItem) {
        setSwitchDialogOpen(true)
        setSelectedRow(invoice)
    }

    function handleSwitchDialogClose() {
        setSwitchDialogOpen(false)
        setSelectedRow(null)
    }

    function handleSwitchPaymentStatus(){
        console.log(selectedRow)
        put(route('invoices.switch-payment', [selectedRow?.id]), {
            onSuccess: handleSwitchDialogClose
        })
    }

    const columns: ColumnDef<InvoiceItem>[] = [
        {
            accessorKey: 'nomor',
            id: 'no. invoice',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="No. Invoice" />
            ),
            cell: ({row}) => <InvoiceSheetContents label={row.original.nomor} invoice={row.original}/>,
        },
        {
            accessorKey: 'purchase_order.supplier.name',
            id: 'supplier',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Supplier" />
            ),
            cell: ({row}) => <InvoiceSheetContents label={row.original.purchase_order.supplier.name} invoice={row.original}/>
        },
        {
            accessorKey: 'invoice_date',
            id: 'tanggal invoice',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Tanggal Invoice" />
            ),
            cell: ({row}) => <InvoiceSheetContents label={row.original.invoice_date} invoice={row.original}/>
        },
        {
            accessorKey: 'due_date',
            id: 'jatuh tempo',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Jatuh Tempo" />
            ),
            cell: ({row}) => <InvoiceSheetContents label={row.original.due_date} invoice={row.original}/>
        },
        {
            accessorFn: (row, index) => {
                return row.purchase_order.price * (100 - row.discount) / 100;
            },
            id: 'jumlah harga',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Total Harga" />
            ),
            cell: ({row}) => <InvoiceSheetContents label={`Rp ${(row.original.purchase_order.price * (100 - row.original.discount) / 100).toLocaleString()},00`} invoice={row.original}/>,
            sortingFn: (rowa, rowb, id) => {
                const valuea = rowa.original.purchase_order.price * (100 - rowa.original.discount) / 100
                const valueb = rowb.original.purchase_order.price * (100 - rowb.original.discount) / 100
                if(valuea < valueb) return -1;
                else if(valuea === valueb) return 0;
                return 1;
            },
        },
        {
            id: 'status',
            accessorFn: (row, id) => row.payment_status ? "1" : "0",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Status" />
            ),
            cell: ({row}) => <PaymentStatusBadge status={row.original.payment_status}></PaymentStatusBadge>,
            filterFn: (row, id, value) => {
                return value.includes(row.getValue(id))
            },
        },
        {
            id: "kolekbilitas",
            accessorFn: (row, index) => {
                const val = (new Date(row.due_date).getTime() - new Date().getTime()) / (1000 * 3600 * 24)
                if(row.payment_status || val >= 0 ) return "1"
                else if(val >= -90) return "2"
                else if(val >= -120) return "3"
                else if(val >= -180) return "4"
                return "5"
            },
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Kolekbilitas" />
            ),
            cell: ({row}) => <CollectbilityBadge due_date={row.original.due_date} status={row.original.payment_status}/>,
            sortingFn: (rowa, rowb, id) => {
                const valuea = new Date().getTime() - new Date(rowa.original.due_date).getTime()
                const valueb = new Date().getTime() - new Date(rowb.original.due_date).getTime()
                if((rowa.original.payment_status == true && rowb.original.payment_status == false)) return -1;
                else if((rowa.original.payment_status === rowb.original.payment_status)) {
                    if(valuea < valueb) return -1;
                    else if(valuea === valueb) return 0;
                    return 1;
                }
                return 1;
            },
            filterFn: (row, id, value) => {
                return value.includes(row.getValue(id))
            },
        },
        {
            id: 'actions',
            header: 'Actions',
            cell: ({row}) =>
                <InvoiceActionsRow
                    invoice={row.original}
                    handleDialogOpen={handleDialogOpen}
                    handleSwitchDialogOpen={handleSwitchDialogOpen}
                />,
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
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    return(
        <div className="space-y-4">
            <DataTableToolbar table={table} kolSelection={kolSelection} paidmentSelection={paidmentSelection} />
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
            <DialogSwitchPayment
                nomor={selectedRow?.nomor ?? ""}
                open={switchDialogOpen}
                handleDialogClose={handleSwitchDialogClose}
                handleSwitchPayment={handleSwitchPaymentStatus}
            />
        </div>
    )
}

interface InvoiceActionRowProps {
    invoice: InvoiceItem
    handleDialogOpen: (invoice : InvoiceItem) => void
    handleSwitchDialogOpen: (invoice: InvoiceItem) => void
}

function InvoiceActionsRow({invoice, handleDialogOpen, handleSwitchDialogOpen} : InvoiceActionRowProps) {
    return(
        <div className="flex gap-2">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant={"ghost"} size={"icon"} onClick={() => handleSwitchDialogOpen(invoice)}>
                            <RefreshCcwDot />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Ubah Status Pembayaran</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant={"ghost"} size={"icon"}>
                        <Ellipsis />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuGroup>
                        <Link href={route('invoices.detail', [invoice.id])}>
                            <DropdownMenuItem>
                                Lihat
                            </DropdownMenuItem>
                        </Link>
                        <Link href={route('invoices.edit', [invoice.id])}>
                            <DropdownMenuItem>
                                Edit
                            </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem onClick={() => handleDialogOpen(invoice)}>
                            Hapus
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
