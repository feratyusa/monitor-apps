import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head } from "@inertiajs/react";
import { InvoicesDataTable } from "./table/data-table";
import { columns } from "./table/columns";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Invoices',
        href: '/invoices',
    },
];

const data: InvoiceItem[] = [
    {
        number: '001/INV/PT-AKN/IV/2025',
        supplier: 'PT Akinator Bersama',
        invoice_date: '2025-03-12',
        due_date: '2025-05-12',
        total_amount: 25000000,
    },
    {
        number: '002/INV/PT-SMB/IV/2025',
        supplier: 'PT Semesta Bersama',
        invoice_date: '2025-01-12',
        due_date: '2025-03-12',
        total_amount: 30000000,
    },
    {
        number: '011/INV/CV-IND/IV/2025',
        supplier: 'CV Indonesia Iya',
        invoice_date: '2024-11-25',
        due_date: '2025-01-31',
        total_amount: 30000000,
    },
    {
        number: '015/INV/PT-ND/IV/2025',
        supplier: 'PT Ini Dia',
        invoice_date: '2024-05-25',
        due_date: '2024-08-25',
        total_amount: 12000000,
    },
    {
        number: '018/INV/PT-LKI/IV/2025',
        supplier: 'PT Laki India',
        invoice_date: '2024-11-05',
        due_date: '2025-01-15',
        total_amount: 50000000,
    },
]

export default function Invoices() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Invoices" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <InvoicesDataTable data={data} columns={columns}/>
            </div>
        </AppLayout>
    );
}
