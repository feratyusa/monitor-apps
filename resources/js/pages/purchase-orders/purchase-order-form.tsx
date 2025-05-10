import { dummyPurchaseOrders } from "@/dummy/dummy_data";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { ProductItem, PurchaseOrderItem, SelectOptionAttribute } from "@/types/local";
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
    supplierOptions: SelectOptionAttribute[],
    productOptions: SelectOptionAttribute[],
    products: ProductItem[],
}

export default function PurchaseOrderForm({purchase_order,supplierOptions, productOptions, products } : POFormProps) {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Invoices" />
            <div className="flex h-full flex-1 flex-col gap-4 items-center rounded-xl p-4">
                <POFormComps
                    purchase_order={purchase_order} supplierOptions={supplierOptions}
                    productOptions={productOptions} products={products}
                />
            </div>
        </AppLayout>
    );
}
