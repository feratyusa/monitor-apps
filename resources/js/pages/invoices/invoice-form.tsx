import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { InvoiceItem } from "@/types/local";
import { Head } from "@inertiajs/react";
import { dummyInvoices, dummyPurchaseOrders } from "@/dummy/dummy_data";
import InvoiceFormComps from "./partials/form";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Invoice Form',
        href: '/invoices/create',
    },
];

interface InvoiceFormProps {
    invoice?: InvoiceItem | null,
    prep?: boolean
}

export default function InvoiceForm({invoice, prep} : InvoiceFormProps) {
    if(prep) invoice = dummyInvoices[0]

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Invoices" />
            <div className="flex h-full flex-1 flex-col gap-4 items-center rounded-xl p-4">
                <InvoiceFormComps invoice={invoice} />
            </div>
        </AppLayout>
    );
}
