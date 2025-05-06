import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<InvoiceItem>[] = [
    {
        accessorKey: 'number',
        header: "No. Invoice"
    },
    {
        accessorKey: 'supplier',
        header: "Supplier"
    },
    {
        accessorKey: 'invoice_date',
        header: "Tanggal Invoice"
    },
    {
        accessorKey: 'due_date',
        header: "Jatuh Tempo"
    },
    {
        accessorKey: 'total_amount',
        header: "Total Harga"
    },
]
