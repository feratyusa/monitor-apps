import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { InvoiceItem, PurchaseOrderItem, SelectOptionAttribute } from "@/types/local";
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
    purchase_order_options: SelectOptionAttribute[]
    purchase_orders: PurchaseOrderItem[]
}

export default function InvoiceForm({invoice, purchase_order_options, purchase_orders} : InvoiceFormProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Invoices" />
            <div className="flex h-full flex-1 flex-col gap-4 items-center rounded-xl p-4">
                <InvoiceFormComps invoice={invoice} purchase_order_options={purchase_order_options} purchase_orders={purchase_orders}/>
            </div>
        </AppLayout>
    );
}
