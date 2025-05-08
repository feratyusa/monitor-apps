import { Button } from "@/components/ui/button";
import { PlaceholderPattern } from "@/components/ui/placeholder-pattern";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head, Link } from "@inertiajs/react";
import { ListOrdered, Plus } from "lucide-react";
import { PurchaseOrderTable } from "./table/data-table";
import { dummyPurchaseOrders } from "@/dummy/dummy_data";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Purchase Orders',
        href: '/purchase-orders',
    },
];

export default function PurchaseOrders() {
    const data = dummyPurchaseOrders

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Purchase Orders" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            <div className="grid gap-2">
                    <div className="flex items-center gap-2">
                        <ListOrdered />
                        <p className="text-2xl font-extrabold">Purchase Order</p>
                    </div>
                    <p className="text-sm ext-muted-foreground">List purchase order</p>
                </div>
                <Link href={route('purchase-orders.create')}>
                    <Button className="w-full" variant={"outline"}>
                        <Plus />
                        Tambah Purchase Order
                    </Button>
                </Link>
                <PurchaseOrderTable data={data}/>
            </div>
        </AppLayout>
    );
}
