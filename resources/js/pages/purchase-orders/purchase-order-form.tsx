import { dummyPurchaseOrders } from "@/dummy/dummy_data";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { PurchaseOrderItem } from "@/types/local";
import { Head } from "@inertiajs/react";
import POFormComps from "./partials/form";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Purchase Order Form',
        href: '/purchase-orders/create',
    },
];

interface POFormProps {
    purchase_order?: PurchaseOrderItem | null,
    prep?: boolean
}

export default function PurchaseOrderForm({purchase_order, prep} : POFormProps) {
    if(prep) purchase_order = dummyPurchaseOrders[0]

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Invoices" />
            <div className="flex h-full flex-1 flex-col gap-4 items-center rounded-xl p-4">
                <POFormComps purchase_order={purchase_order}/>
            </div>
        </AppLayout>
    );
}
