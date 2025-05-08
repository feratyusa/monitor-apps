import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head, Link } from "@inertiajs/react";
import { InvoicesDataTable } from "./table/data-table";
import { dummyInvoices } from "@/dummy/dummy_data";
import { Button } from "@/components/ui/button";
import { Plus, Receipt } from "lucide-react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Invoices',
        href: '/invoices',
    },
];

export default function Invoices() {
    const data = dummyInvoices

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Invoices" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid gap-2">
                    <div className="flex items-center gap-2">
                        <Receipt />
                        <p className="text-2xl font-extrabold">Invoice</p>
                    </div>
                    <p className="text-sm ext-muted-foreground">List invoice</p>
                </div>
                <Link href={route('invoices.create')}>
                    <Button className="w-full" variant={"outline"}>
                        <Plus />
                        Tambah Invoice
                    </Button>
                </Link>
                <InvoicesDataTable data={data}/>
            </div>
        </AppLayout>
    );
}
